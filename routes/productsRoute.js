
const express = require("express");
const { handleCreateProduct, handleFetchProduct, handleupdatewishlist} = require("../controller/productsController");
const upload = require("../middleware/multer");

const router = express.Router();

router.post("/add-product" , upload.single("image"), handleCreateProduct)
router.get("/get-product/:id" , handleFetchProduct)
router.put("/update-wishlist/:id" , handleupdatewishlist)




module.exports = router;