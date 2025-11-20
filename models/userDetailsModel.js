const { default: mongoose } = require("mongoose");

const userDetailsScheme = new mongoose.Schema({
    fullName: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: Number,
        require: true
    },
    pincode: {
        type: Number,
        require: true
    },
    addressType: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    landmark: {
        type: String,
        require: true
    },
    isDefault: {
        type: Boolean, // Fixed typo: was "Boo"
        require: true
    },

}, { timestamps: true })


const UserDetails = mongoose.model("userDetials", userDetailsScheme);

module.exports = UserDetails;