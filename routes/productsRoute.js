
const express = require("express");
const { handleCreateProduct, handleFetchProduct } = require("../controller/productsController");

const router = express.Router();

router.post("/add-product" , handleCreateProduct)
router.get("/get-product" , handleFetchProduct)


module.exports = router;