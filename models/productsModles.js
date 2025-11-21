const { default: mongoose } = require("mongoose");

const ProductsSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    offers: {
        type: Number,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    storage: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    discount: {
        type: String,
        required: true
    },
    wishlist: {
        type: Boolean,
        required: true
    },
    addCrad: {
        type: Boolean,
        required: true
    },
    image: {
        type: String,
        default: "/image/defultimage.jpg"
    }

}, { timestamps: true });

const Products = mongoose.model("Product", ProductsSchema);

module.exports = Products;