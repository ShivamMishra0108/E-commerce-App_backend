const express =  require('express');
const Vendor = require('../models/vendor');
const VendorRouter = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



VendorRouter.post('/api/vendor/signup', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Validate input
    if (!fullName || !email || !password) {
      return res.status(400).json({ msg: 'All fields are required' });
    }

    // Check if email already exists
    const existingEmail = await Vendor.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ msg: 'Email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user
    let vendor = new Vendor({ fullName, email, password: hashedPassword });
    vendor = await vendor.save();

    res.status(201).json({ msg: 'User registered successfully', vendor });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


// 🔹 SIGNIN
VendorRouter.post('/api/vendor/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ msg: 'Email and password are required' });
    }

    // Find user
    const findUser = await Vendor.findOne({ email });
    if (!findUser) {
      return res.status(400).json({ msg: 'Vendor not found with this email' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Incorrect password' });
    }

    // Create token
    const token = jwt.sign({ id: findUser._id }, 'passwordKey');

    // Remove sensitive info
    const { password: _, ...vendorWithoutPassword } = findUser._doc;

    res.status(200).json({ token,vendor:vendorWithoutPassword });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET All Banners
VendorRouter.get('/api/vendor/get-vendor', async (req, res) => {
    try {
        const vendors = await Vendor.find();
        res.json(vendors);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


module.exports = VendorRouter;