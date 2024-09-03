const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },

    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },

    password: {
        type: String,
        required: [true, "password is required"]
    },

    status: {
        type: String,
        default: "pending"
    }
}, {
    timestamps: true
})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel

