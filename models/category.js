const mongoose = require('mongoose');
const Banner = require('./banner');

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    banner:{
        type: String,
        required: true,
    },
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;