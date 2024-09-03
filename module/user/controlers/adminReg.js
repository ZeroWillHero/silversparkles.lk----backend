const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const sendMail = require("../../../manager/mail")
const jwtEncrypt = require("../../../manager/jwtEncrypt")
const db = require("../../../model/mysql/index")

// Mysql DB model call
const user = db.user;


const AdminRegister = async (req, res) => {

    const { name, email, password } = req.body


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




    //save data Sequelize
    let data = {
        name: name,
        email: email,
        password: hash,
        status: 'pending',
        role: 'admin_Pending'
    }

    user.create(data).then((data) => {
        console.log("succes full created Mysql");
    }).catch((error) => {
        console.log(error);
    });

    const token = jwtEncrypt(email)
    const link = `${process.env.BASE_URL}/api/user/verify-email?token=${token}`
    await sendMail(email, "Register", link)

    const adminlink = `${process.env.BASE_URL}/api/user/admin-verify-email?token=${token}`
    await sendMail(process.env.ADMIN_EMAIL, "Register-Admin-Verify", adminlink)

    res.status(200).json({
        status: "succesfull",
        massage: "Email Verification link has been sent to your email"
    })
}

module.exports = AdminRegister