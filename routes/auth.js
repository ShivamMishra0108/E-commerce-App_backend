const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authRouter = express.Router();

// 🔹 SIGNUP
authRouter.post('/signup', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Validate input
    if (!fullName || !email || !password) {
      return res.status(400).json({ msg: 'All fields are required' });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ msg: 'Email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user
    let user = new User({ fullName, email, password: hashedPassword });
    user = await user.save();

    res.status(201).json({ msg: 'User registered successfully', user });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// 🔹 SIGNIN
authRouter.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ msg: 'Email and password are required' });
    }

    // Find user
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(400).json({ msg: 'User not found with this email' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Incorrect password' });
    }

    // Create token
    const token = jwt.sign({ id: findUser._id }, 'passwordKey');

    // Remove sensitive info
    const { password: _, ...userWithoutPassword } = findUser._doc;

    res.status(200).json({ token,user:userWithoutPassword });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

authRouter.put('/user/:id', async (req, res) => {
  try {
    const {id} = req.params;

    const {state, city, locality} = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {state, city, locality},
      {new: true},
    );

    if(!updatedUser){
      return res.status(404).json({error: "User Not Found"});
    }
    return res.status(200).json(updatedUser);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
module.exports = authRouter;
