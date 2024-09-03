const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
require("dotenv").config();
const db = require("../../../model/mysql/index")

// Mysql DB model call
const User = db.user;

const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    //const userModel = mongoose.model("user");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.data) {
        res.status(400).json({
            status: "fail",
            message: "invalid token"
        })
        return
    }

    if (!newPassword) {
        res.status(400).json({
            status: "fail",
            message: "password is required"
        })
        return
    }

    const hash = await bcrypt.hash(newPassword, 10);

    // MongoDB code
    // await userModel.updateOne({ email: decoded.data }, { password: hash }).then((user) => {
    //     res.status(200).send({status: 'success', message: 'Password reset successful'});
    // }).catch((error) => {
    //     res.status(400).json({
    //         status: "fail",
    //         message: "something went wrong"
    //     })
    // });

    // Sequelize code
    try {
        const [updated] = await User.update({ password: hash }, { where: { email: decoded.data } });
        if (updated) {
            res.status(200).send({ status: 'success', message: 'Password reset successful' });
        } else {
            res.status(400).json({
                status: "fail",
                message: "Invalid Email"
            });
        }
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Something went wrong"
        });
    }




}

module.exports = resetPassword;