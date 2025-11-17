const mongoose = require ("mongoose");


const userSchema = new mongoose.Schema({
    name: {
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

    }
}, { timeseries: true })

const User = mongoose.model("user", userSchema)

module.exports = User;