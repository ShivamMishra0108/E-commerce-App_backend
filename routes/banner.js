const express = require('express');
const Banner = require('../models/banner');

const bannerRouter = express.Router();

// CREATE Banner
bannerRouter.post('/', async (req, res) => {
    try {
        const { image } = req.body;
        if (!image) return res.status(400).json({ error: "Image is required" });

        const banner = new Banner({ image });
        await banner.save();
        res.status(201).json(banner);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// GET All Banners
bannerRouter.get('/', async (req, res) => {
    try {
        const banners = await Banner.find();
        res.json(banners);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = bannerRouter;
