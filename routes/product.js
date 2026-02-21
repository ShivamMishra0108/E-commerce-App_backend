const express = require('express');
const Product = require('../models/product');
const {auth,vendorAuth} = require('../middleware/jsonwebtoken');
const productRouter = express.Router();

// CREATE product
productRouter.post('/api/upload-products',auth,vendorAuth, async (req, res) => {
  try {
    const { productName, productPrice, quantity, description, category, vendorId, fullName, subCategory, images, popular, recommend } = req.body;

    // Validate required fields
    if (!productName || productPrice == null || quantity == null
      || !description ||
      !category || !vendorId || !fullName || !subCategory ||
      !images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ error: "All fields including at least one image are required" });
    }

    const product = new Product({
      productName,
      productPrice,
      quantity,
      description,
      category,
      vendorId,
      fullName,
      subCategory,
      images,
      popular: popular ?? true,
      recommend: recommend ?? false
    });
    console.log(product);
    await product.save();
    res.status(201).json(product);

  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
});

// GET all products
productRouter.get('/api/get-products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }

});

// GET popular products
productRouter.get('/api/popular-products', async (req, res) => {
  try {
    const popularProducts = await Product.find({ popular: true });
    res.json(popularProducts);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET recommended products
productRouter.get('/api/recommended-products', async (req, res) => {
  try {
    const recommendedProducts = await Product.find({ recommend: true });
    res.json(recommendedProducts);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get products by Category:
productRouter.get('/api/products-by-category/:category', async(req, res) => {
try {
  const {category} = req.params;
  const products = await Product.find({category,popular:true});
  if(!products || products.length == 0){
    return res.status(404).json({msg: "Product not found"});
  }
  else{
    return res.status(200).json(products);
  }
} catch (e) {
  res.status(500).json({error: e.message});
}
});

productRouter.get('/api/products-by-subcategory/:productId',async(req,res)=>{
  try {
    const {subCategory} = req.params;
    const product = await Product.findById({_id});

    if(!product){
      return res.status(404).json({msg: "Product not found"});
    }else{
      const relatedProduct = await Product.find({
        subCategory:product.subCategory,
        _id:{$ne:product._id} // Excluding current product
      });

      if(!relatedProduct || relatedProduct.length == 0){
        return res.status(404).json({msg: "No related products found"});
      }

      return res.status(200).json(relatedProduct);
    }
  } catch (e) {
    res.status(500).json({error: e.message});
  }
});

productRouter.get('/api/topRated-products', async (req,res) =>{
  try {
    const ratedProducts = await Product.find({}).sort({averageRating: -1}).limit(10);

    if(!ratedProducts || ratedProducts.length == 0){
      return res.status(404).json({msg: "No top rated products found"});
    }
    return res.status(200).json(ratedProducts);
  } catch (error) {
    res.status(500).json({error: e.message});
  }
});

productRouter.delete("/api/delete-products", async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ error: "IDs are required" });
    }

    await Product.deleteMany({ _id: { $in: ids } });

    res.json({ message: "Products deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = productRouter;
