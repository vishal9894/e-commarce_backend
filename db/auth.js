

const mongoose = require("mongoose")

const mongoUrl = "mongodb://localhost:27017/e_commarce"

const connectDB = async () => {
    try {
        await mongoose.connect(mongoUrl)
        console.log("DB is connected");

    } catch (error) {
        console.log(error);

    }
}

module.exports = connectDB