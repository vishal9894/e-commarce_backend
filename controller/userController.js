const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { setUser } = require("../services/auth");
const UserDetails = require("../models/userDetailsModel");

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

        res.cookie("token", token)



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
        const { firstname, lastname, gender, mobilenumber, profileAvatar } = req.body;

        // Input validation
        if (!paramId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const response = await User.findByIdAndUpdate(
            paramId,
            { firstname, lastname, gender, mobilenumber, profileAvatar },
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

const handleCreateAddress = async (req, res) => {
    try {
        const { fullName, phoneNumber, pincode, addressType, address, location, city, state, landmark, isDefault } = req.body;

        // Check if address already exists
        const isMatch = await UserDetails.findOne({ address });

        if (isMatch) {
            return res.status(400).json({
                message: "Address already exists"
            });
        }

        // If new address is being set as default
        if (isDefault === true) {
            // Find and update any existing default address to non-default
            await UserDetails.updateMany(
                { isDefault: true },
                { $set: { isDefault: false } }
            );
        }

        const addresssave = new UserDetails({
            fullName,
            phoneNumber,
            pincode,
            addressType,
            address,
            location,
            city,
            state,
            landmark,
            isDefault: isDefault || false // Set to false if not provided
        });

        await addresssave.save();

        res.status(200).json({
            message: "Address created successfully",
            addresssave
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

const handleActiveAddressFetch = async (req, res) => {
    try {
        const activeAddress = await UserDetails.findOne({ isDefault: true });

        res.status(200).json({ message: "active account fetch sucessfully", activeAddress })
    } catch (error) {
        console.log(error);

    }
}

const handleFetchAddress = async (req, res) => {
    try {
        const responseData = await UserDetails.find();

        res.status(200).json({ message: ' fetch address sucessfully', responseData })

    } catch (error) {
        console.log(error);

    }
}

module.exports = { handleSignup, handleLogin, handleGetProfile, handleUpdateProfile, handleCreateAddress, handleFetchAddress, handleActiveAddressFetch };
