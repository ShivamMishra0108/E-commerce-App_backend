const express = require("express");
const SubCategory = require("../models/sub_category");

const subCategoryRouter = express.Router();

subCategoryRouter.post("/api/upload-subcategories", async (req, res) => {
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
    console.log(subCategory);
    await subCategory.save();
    res.status(201).json(subCategory);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});



subCategoryRouter.get("/api/get-subcategories", async (req, res) => {
  try {
    const subCategories = await SubCategory.find();
    res.json(subCategories);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = subCategoryRouter;
