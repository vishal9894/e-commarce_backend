const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,

    }
    ,
    password: {
        type: String,
        require: true,
    },
    profileAvatar: {
        type: String,
        default: "/image/defultimage.jpg"

    }, gendar: {
        type: String,
        require: true
    }, mobilenumber: {
        type: Number,
        require: true
    }
}, { timeseries: true })

const User = mongoose.model("user", userSchema)

module.exports = User;