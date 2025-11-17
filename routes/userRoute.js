const { handleSignup, handleLogin, handleGetProfile } = require("../controller/userController");
const express = require("express").Router

const router = express();

router.post("/signup", handleSignup);
router.post("/login", handleLogin);
router.get("/getprofile", handleGetProfile);

module.exports = router;
