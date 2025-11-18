const User = require("../models/userModel");
const bcrypt = require("bcrypt")


const handleSignup = async (req, res) => {
    try {
        const { email, firstname , lastname, password } = req.body;

        if (!email || !firstname || !lastname || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = new User({
            email,
            firstname,
            lastname ,
            password: hashedPassword,
        });
        await newUser.save();

        

        res.status(201).json({ message: "User created successfully" , user :{
            email : newUser.email ,
            firstname : newUser.firstname ,
            lastname : newUser.lastname
        } , token});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: " user not exist" });
        }

        const users = await bcrypt.compare(password, user.password);


        res.status(200).json({ message: " login sucessfully" })

    } catch (error) {
        console.log(error);

    }
}

const handleGetProfile = async (req, res) => {
   try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Fetched data successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { handleSignup, handleLogin ,handleGetProfile};