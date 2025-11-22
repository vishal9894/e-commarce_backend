const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ['MobilePhones    1', 'Cosmetics', 'Electronics', 'WashingMachines', 'Furniture', 'Watches', 'HomeDecor', 'Accessories'],
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    offers: {
        type: Number,
        default: 0
    },
    productName: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    storage: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    wishlist: {
        type: Boolean,
        default: false
    },
    addCrad: { // Consider renaming to 'addToCart' for better naming
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Products = mongoose.model("Product", ProductsSchema);

module.exports = Products;