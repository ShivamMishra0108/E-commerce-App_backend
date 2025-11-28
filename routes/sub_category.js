const express = require("express");
const SubCategory = require("../models/sub_category");

const subCategoryRouter = express.Router();

// CREATE SubCategory
subCategoryRouter.post("/", async (req, res) => {
  try {
    const { categoryId, categoryName, image, subCategoryName } = req.body;

    if (!categoryId || !categoryName || !image || !subCategoryName) {
      return res.status(400).json({ error: "All fields are required" });

      
    }

    const subCategory = new SubCategory({
      categoryId,
      categoryName,
      image,
      subCategoryName,
    });

    await subCategory.save();
    res.status(201).json(subCategory);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

subCategoryRouter.get('/api/subcategories',async(req,res) =>{
  try {
    const subcategories = SubCategory.find();
    return res.status(200).json(subcategories);
  } catch (e) {
    res.status(500).json({ error: e.message });

  }
});

// GET all subcategories
subCategoryRouter.get("/", async (req, res) => {
  try {
    const subCategories = await SubCategory.find();
    res.json(subCategories);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = subCategoryRouter;
