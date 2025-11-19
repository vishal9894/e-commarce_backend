const { handleSignup, handleLogin, handleGetProfile, handleUpdateProfile } = require("../controller/userController");
const authmiddleware = require("../middleware/authontication");
const express = require("express").Router

const router = express();

router.post("/signup", handleSignup);
router.post("/login", handleLogin);
router.get("/getprofile" , authmiddleware , handleGetProfile);
router.put("/update/:id", handleUpdateProfile);


module.exports = router;
