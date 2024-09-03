const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwtManager = require('../../../manager/jwtmanager');
const db = require("../../../model/mysql/index")

// Mysql DB model call
const UserDB = db.user;

const login = async (req, res) => {
    //const userModel = mongoose.model('user');
    const {email, password, admin} = req.body;

    if(!email){
        res.status(400).json({
            status:"fail",
            message:"email is required"
        });
        return;
    }

    if(!password){
        res.status(400).json({
            status:"fail",
            message:"password is required"
        });
        return;
    }
    // mongoose code
    //const user = await userModel.findOne({email:email})

    const user = await UserDB.findOne({ where: { email: email } });
    //console.log("User data",user.id);
    if(!user){
        res.status(400).json({
            status:"fail",
            message:"invalid email"
        });
        return;
    }


    const validPassword = await bcrypt.compare(password, user.password);
    
    if(!validPassword){
        res.status(400).json({
            status:"fail",
            message:"invalid password"
        });
        return;
    
    }

    if(admin){
        if(user.role !== 'admin'){
            res.status(400).json({
                status:"fail",
                message:"Invalid user role"
            });
            return;
        }
    }

    if(user.status === 'pending'){
        res.status(400).json({
            status:"fail",
            message:"Emai not verified yet"
        });
        return;
    } else if(user.status === 'active'){
        res.status(200).json({
            status:"success",
            message: 'Login successful',
            accessToken:jwtManager(user),
            userId : user.id
        });
        return;
    } else {
        res.status(400).json({
            status:"fail",
            message:"Invalid user status"
        });
        return;
    }

};

module.exports = login