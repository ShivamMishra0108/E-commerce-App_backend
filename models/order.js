const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    
    fullName: {
        type:String,
        trim:true,
        required:true,
    },
    email: {
        type:String,
        trim:true,
        required:true,
    },
    
    state: {
        type:String,
        trim:true,
        required:true,
    },
    
    city: {
        type:String,
        trim:true,
        required:true,
    },
    
    locality: {
        type:String,
        trim:true,
        required:true,
    },
    
    productName: {
        type:String,
        trim:true,
        required:true,
    },
    productPrice: {
        type:Number,
        trim:true,
        required:true,
    },
    
    quantity: {
        type:Number,
        trim:true,
        required:true,
    },
    category: {
        type:String,
        trim:true,
        required:true,
    },
    image: {
        type:String,
        trim:true,
        required:true,
    },
    buyerId: {
        type:String,
        trim:true,
        required:true,
    },
    vendorId: {
        type:String,
        trim:true,
        required:true,
    },
    createdAt: {
        type:Number,
        trim:true,
        required:true,
    },
});


const Order = mongoose.model("Order", orderSchema);

module.exports = Order;


