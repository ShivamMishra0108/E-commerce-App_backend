const express = require('express');
const Banner = require('../models/banner');
const productRouter = require('./product');

const bannerRouter = express.Router();

// bannerRouter.post('/api/upload-banner', async (req, res) => {
//     try {
//         const { image } = req.body;
//         if (!image) return res.status(400).json({ error: "Image is required" });

//         const banner = new Banner({ image });
//         await banner.save();
//         res.status(201).json(banner);
//     } catch (e) {
//         res.status(500).json({ error: e.message });
//     }
// });

// CREATE Banner
bannerRouter.post('/api/upload-banner', async (req, res) => {
  try {
    console.log("POST /api/upload-banner HIT");
    console.log("BODY:", req.body);

    const { name, banner } = req.body;

    if (!banner) {
      return res.status(400).json({ error: "Banner URL is required" });
    }

    const newBanner = new Banner({
      image: banner,      
      name: name, 
    });

    await newBanner.save();

    console.log("SAVED BANNER:", newBanner);

    return res.status(201).json(newBanner);

  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return res.status(500).json({
      error: "Failed to upload banner",
      details: error.message,
    });
  }
});



// GET All Banners
bannerRouter.get('/api/get-banner', async (req, res) => {
    try {
        const banners = await Banner.find();
        res.json(banners);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


bannerRouter.delete("/api/delete-banners", async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ error: "IDs are required" });
    }

    await Banner.deleteMany({ _id: { $in: ids } });

    res.json({ message: "Banner is deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
module.exports = bannerRouter;
