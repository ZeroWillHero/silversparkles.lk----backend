const express = require("express");
const userRegister = require("./controlers/userRegister");
const userLogin = require("./controlers/userLogin");
const adminMiddleware = require("../../middleware/adminauth");
const resetEmail = require("./controlers/resetEmail");
const resetPassword = require("./controlers/resetPassword");
const emailVerify = require("./controlers/emailVerify");
const resetEmailVerify = require("./controlers/resetEmailVerify"); 
const getTotalCustomers = require("./controlers/getTotalCustomers")
const adminRegisterform = require("./controlers/adminRegForm")
const adminEmilVerify = require("./controlers/adminRegVerify")
const adminRegister = require("./controlers/adminReg")

const userRoutes = express.Router() 

// Routes
userRoutes.post("/register",userRegister);
userRoutes.post("/login",userLogin);
userRoutes.post("/reset-email",resetEmail);
userRoutes.post("/password-reset",resetPassword);
userRoutes.get("/verify-email",emailVerify);
userRoutes.get("/password-reset",resetEmailVerify);
userRoutes.get("/admin-register-form",adminRegisterform);
userRoutes.get("/admin-verify-email",adminEmilVerify);
userRoutes.post("/admin-register",adminRegister);

userRoutes.use(adminMiddleware);
userRoutes.get('/total-customers', getTotalCustomers); 


module.exports = userRoutes