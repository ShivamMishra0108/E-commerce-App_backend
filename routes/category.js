const express = require('express');
const Category = require('../models/category');

const categoryRouter = express.Router();

// CREATE Category
categoryRouter.post('/', async (req, res) => {
    try {
        const { name, image, banner } = req.body;
        if (!name || !image || !banner)
            return res.status(400).json({ error: "All fields are required" });

        const category = new Category({ name, image, banner });
        await category.save();
        res.status(201).json(category);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// GET All Categories
categoryRouter.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = categoryRouter;
