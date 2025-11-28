const express = require('express');
const Product = require('../models/product');

const productRouter = express.Router();

// CREATE product
productRouter.post('/', async (req, res) => {
  try {
    const { productName, productPrice, quantity, description, category, subCategory, image, popular, recommend } = req.body;

    // Validate required fields
    if (!productName || !productPrice || !quantity || !description || !category || !subCategory || !image || image.length === 0) {
      return res.status(400).json({ error: "All fields including at least one image are required" });
    }

    const product = new Product({
      productName,
      productPrice,
      quantity,
      description,
      category,
      subCategory,
      image,
      popular: popular ?? true,    // default true if not provided
      recommend: recommend ?? false
    });

    await product.save();
    res.status(201).json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET all products
productRouter.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET popular products
productRouter.get('/popular', async (req, res) => {
  try {
    const popularProducts = await Product.find({ popular: true });
    res.json(popularProducts);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET recommended products
productRouter.get('/recommended', async (req, res) => {
  try {
    const recommendedProducts = await Product.find({ recommend: true });
    res.json(recommendedProducts);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = productRouter;
