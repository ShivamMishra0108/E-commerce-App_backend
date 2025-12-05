const express = require('express');
const Category = require('../models/category');

const categoryRouter = express.Router();

// CREATE Category
categoryRouter.post('/api/upload-categories', async (req, res) => {
    try {
        const { name, image, banner } = req.body;
        if (!name || !image || !banner)
            return res.status(400).json({ error: "All fields are required" });

        const category = new Category({ name, image, banner });
        console.log(category);
        await category.save();
        res.status(201).json(category);

    } catch (e) {
        console.log(e);  // <-- FIXED
        res.status(500).json({ error: e.message });
    }
});

// GET All Categories
categoryRouter.get('/api/get-categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


categoryRouter.delete("/api/delete-categories", async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ error: "IDs are required" });
    }

    await Category.deleteMany({ _id: { $in: ids } });

    res.json({ message: "Categories deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
module.exports = categoryRouter;
