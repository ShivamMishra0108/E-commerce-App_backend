const express =  require('express');
const ProductReview = require('../models/product_review');
const Product = require('../models/product');

const productReviewRouter = express.Router();

productReviewRouter.post('/product-review', async (req, res) => {
    try {
        const {buyerId, email, fullName, productId, rating, review} = req.body;

        const existingReview = await ProductReview.findOne({buyerId,productId});

        if(existingReview){
            return res.status(404).json({msg: "You have already reviewed thid product"});
        }
        const reviews = new ProductReview({
            buyerId, email, fullName, productId, rating, review});
            await reviews.save();

            // find the product with use of product id:
            const product = await Product.findById(productId);

            if(!product){
                return res.status(404).json({msg:"product not found"});
            }

            product.totalRatings +=1;

            product.averageRating = ((product.averageRating*(totalRatings-1))+rating)/product.totalRatings;

            await product.save();

            return res.status(201).send(reviews);

    } catch (e) {
         res.status(500).json({"error": e.message});
    }
});

productReviewRouter.get('/',async(req, res) =>{
    try {
        const reviews = await ProductReview.find();
        return res.status(200).json(reviews);
        
    } catch (e) {
        res.status(500).json({"error": e.message});
    }
})

module.exports = productReviewRouter;