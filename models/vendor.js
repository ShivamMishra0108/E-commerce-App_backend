const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (value) => {
        const result = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return result.test(value);
      },
      message: "Please enter a valid email address",
    }
  },
  state: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  locality: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "Vendor",
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        return value.length >= 8;
      },
      message: "Password must be at least 8 characters long",
    }
  }
});

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;
