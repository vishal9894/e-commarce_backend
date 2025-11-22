const Products = require("../models/productsModles");

const handleCreateProduct = async (req, res) => {
    try {
        const { brand, offers, productName, rating, storage, price, discount, wishlist, addCrad, image } = req.body;

      

        // Create new product instance
        const newProduct = new Products({
            brand,
            offers: offers || 0,
            productName,
            rating,
            storage,
            price,
            discount,
            wishlist: wishlist || false,
            addCrad: addCrad || false,
            image 
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

const handleFetchProduct = async (req , res) =>{
    try{
        const product = await Products.find();


        res.status(200).json({message : "fetch all product " , product})
    }catch(error){
        console.log(error);
        
    }
}

module.exports = { handleCreateProduct ,handleFetchProduct };