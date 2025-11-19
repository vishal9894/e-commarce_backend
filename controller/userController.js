const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { setUser } = require("../services/auth");

// Signup
const handleSignup = async (req, res) => {
    try {
        const { email, firstname, lastname, password } = req.body;

        if (!email || !firstname || !lastname || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            firstname,
            lastname,
            password: hashedPassword,
        });
        await newUser.save();


        const token = setUser(newUser);

        res.cookie("token" , token)



        res.status(201).json({
            message: "User created successfully", user: {
                email: newUser.email,
                firstname: newUser.firstname,
                lastname: newUser.lastname
            }, token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Login
const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = setUser(user);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600000
        });

        res.status(200).json({ message: "Login successfully", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get profile
const handleGetProfile = async (req, res) => {
    try {
        // req.user should be set by auth middleware
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Fetched data successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


const handleUpdateProfile = async (req, res) => {
    try {
        const paramId = req.params.id;
        const { firstname, lastname, gendar, mobilenumber, profileAvatar } = req.body;
        
        // Input validation
        if (!paramId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const response = await User.findByIdAndUpdate(
            paramId, 
            { firstname, lastname, gendar, mobilenumber, profileAvatar }, 
            {
                new: true,
                runValidators: true
            }
        );

        // Check if user was found and updated
        if (!response) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({
            message: "Profile updated successfully",
            user: response
        });

    } catch (error) {
        console.log("Update profile error:", error);
        
        // Handle different types of errors
        if (error.name === 'CastError') {
            return res.status(400).json({ error: "Invalid user ID format" });
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { handleSignup, handleLogin, handleGetProfile  ,handleUpdateProfile};
