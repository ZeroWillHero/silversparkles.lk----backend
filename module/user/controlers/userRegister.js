const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const sendMail = require("../../../manager/mail")
const jwtEncrypt = require("../../../manager/jwtEncrypt")
const db = require("../../../model/mysql/index")

// Mysql DB model call
const user = db.user;


const register = async (req, res) => {

    const { name, email, password } = req.body
   // const userModel = mongoose.model("user");

    if (!name) {
        res.status(400).json({
            status: "fail",
            massage: "name is required"
        })
        return
    }

    if (!email) {
        res.status(400).json({
            status: "fail",
            massage: "email is required"
        })
        return
    }

    if (!password) {
        res.status(400).json({
            status: "fail",
            massage: "password is required"
        })
        return
    }

    if (password.length < 6) {
        res.status(400).json({
            status: "fail",
            massage: "password must be 6 character long"
        })
        return
    }

    // MongoDB check email exist or not
    // const checkemail = await userModel.findOne({ email: email })

    // Sequelize code to check if an email exists
    const checkemail = await user.findOne({ where: { email: email } });

    if (checkemail) {
        res.status(400).json({
            status: "fail",
            massage: "email already exist"
        })
        return
    }

    //hash password
    const hash = await bcrypt.hash(password, 10);

    // //save data MongoDB
    // await userModel.create({
    //     name: name,
    //     email: email,
    //     password: hash,
    //     status: 'pending'
    // }).then((data) => {
    //     console.log(data);
    // }).catch((error) => {
    //     console.log(error);
    // });


    //save data Sequelize
    let data = {
        name: name,
        email: email,
        password: hash,
        status: 'pending'
    }

    user.create(data).then((data) => {
        console.log("succes full created Mysql");
    }).catch((error) => {
        console.log(error);
    });

    const token = jwtEncrypt(email)
    const link = `${process.env.BASE_URL}/api/user/verify-email?token=${token}`
    await sendMail(email, "Register", link)

    res.status(200).json({
        status: "succesfull",
        massage: "Email Verification link has been sent to your email"
    })
}

module.exports = register