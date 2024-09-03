
const sendMail = require("../../../manager/mail")
const jwtEncrypt = require("../../../manager/jwtEncrypt")
require("dotenv").config();
const db = require("../../../model/mysql/index")

// Mysql DB model call
const UserDB = db.user;


const resetEmail = async (req, res) => {
  const { email } = req.body;


  if (!email) {
    res.status(400).json({
      status: "fail",
      message: "email is required",
    });
    return;
  }

  //const user = await userModel.findOne({ email: email });
  // Sequelize code to check if an email exists
  const user = await UserDB.findOne({ where: { email: email } });
  if (!user) {
    res.status(400).json({
      status: "fail",
      message: "invalid email",
    });
    return;
  }

  try {
    console.log(user.email);
    const token = jwtEncrypt(user.email)
    console.log("token", token)
    const link = `${process.env.BASE_URL}/api/user/password-reset?token=${token}`

    await sendMail(email, "Resetpw", link).then((data) => {
      console.log(data);
    }).catch((error) => {
      console.log(error);
    });

    res.status(200).json({
      status: "succesfully",
      message: "password reset Email send"
    });

  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "something went wrong"
    });
  }
};

module.exports = resetEmail;
