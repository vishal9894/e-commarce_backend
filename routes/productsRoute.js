
const express = require("express");
const { handleCreateProduct, handleFetchProduct } = require("../controller/productsController");
const upload = require("../middleware/multer");

const router = express.Router();

router.post("/add-product" , upload.single("image"), handleCreateProduct)
router.get("/get-product" , handleFetchProduct)


module.exports = router;