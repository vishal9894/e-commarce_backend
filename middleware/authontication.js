
const cookies = require("cookies");
const { getUser } = require("../services/auth");
const authmiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.replace('Bearer ', '');
        console.log("Extracted token:", token);
        
        if (!token) {
            console.log("No token found");
            return res.status(401).json({ message: "Unauthorized - No token" });
        }

        const user = getUser(token);
        console.log("Decoded user:", user);
        
        if (!user) {
            console.log("Invalid token");
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Middleware error:", error);
        return res.status(401).json({ message: "Authentication failed" });
    }
}

module.exports = authmiddleware;