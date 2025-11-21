const { handleSignup, handleLogin, handleGetProfile, handleUpdateProfile, handleCreateAddress, handleFetchAddress, handleActiveAddressFetch, handleDeleteAddress } = require("../controller/userController");
const authmiddleware = require("../middleware/authontication");
const upload = require("../middleware/multer"); // Import multer
const express = require("express");

const router = express.Router();

router.post("/signup", handleSignup);
router.post("/login", handleLogin);
router.get("/getprofile", authmiddleware, handleGetProfile);
router.put("/update/:id", upload.single("avatar"), handleUpdateProfile); // Add multer middleware
router.post("/add-address", handleCreateAddress);
router.get("/get-address", handleFetchAddress);
router.get("/get-active-address", handleActiveAddressFetch);
router.delete("/delete-address/:id" , handleDeleteAddress)

module.exports = router;