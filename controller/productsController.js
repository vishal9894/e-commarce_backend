const Products = require("../models/productsModles");

const handleCreateProduct = async (req, res) => {
    try {
        const { brand, offers, productName, rating, storage, price, discount, wishlist, addCrad, category } = req.body;

        // Check if file was uploaded
        // if (!req.file) {
        //     return res.status(400).json({
        //         message: 'Image is required'
        //     });
        // }

        // Create new product instance
        const newProduct = new Products({
            brand,
            offers: offers || 0,
            productName,
            rating,
            storage,
            price,
            discount,
            category,
            wishlist: wishlist || false,
            addCrad: addCrad || false,
            image: req.file.filename || "" // This will now work since we checked req.file exists
        });

        // Save to database
        await newProduct.save();

        res.status(201).json({
            message: 'Product added successfully',
            product: newProduct
        });

    } catch (error) {
        console.log('Error creating product:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

const handleFetchProduct = async (req, res) => {
    try {
        const paramId = req.params.id;
        const product = await Products.find({ category: paramId });

        res.status(200).json({ message: "fetch all product ", product })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error fetching products',
            error: error.message
        });
    }
}

const handleupdatewishlist = async (req, res) => {
    try {
        const paramaId = req.params.id;
        const { wishlist } = req.body;

        const changeWishlist = await Products.findByIdAndUpdate(paramaId, wishlist, {

            new: true,
            runValidators: true

        })

        res.status(200).json({message : "update sucessfully" , changeWishlist})
    } catch (error) {
        console.log(error);

    }
}





module.exports = { handleCreateProduct, handleFetchProduct ,handleupdatewishlist};