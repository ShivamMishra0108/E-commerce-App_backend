const express = require('express');
const OrderRouter = express.Router();
const Order = require('../models/order');
const {auth, vendorAuth} = require('../middleware/jsonwebtoken');

OrderRouter.post('/orders',auth, async(req, res) => {
    try {
        const {
            fullName,
            email,
            state,
            city,
            locality,
            productName,
            productPrice,
            quantity,
            category,
            image,
            buyerId,
            vendorId,
            processing,
            delivered
        } = req.body;


        const order = new Order({
            fullName,
            email,
            state,
            city,
            locality,
            productName,
            productPrice,
            quantity,
            category,
            image,
            buyerId,
            vendorId,
            processing,
            delivered,
        });

        await order.save();
        return res.status(201).json(order);
    } catch (e) {
        return res.status(500).json({error: e.message});

    }
});

OrderRouter.get('/orders/:buyerId',auth, async (req, res) => {
    
    try {
        const{buyerId} = req.params;

        const orders = await Order.find({buyerId});

        // if(orders.length == 0){
        //     return res.status(404).json({msg: "No orders found"});
        // }

        return res.status(200).json(orders);

    } catch (e) {
        return res.status(500).json({error: e.message});
    }
});

OrderRouter.delete('/orders/delete/:id',async(req, res) => {
    try {
        const{id} = req.params;

        const deletedOrder = await Order.findByIdAndDelete(id);

        if(!deletedOrder){
            return res.status(404).json({msg: "No Order Found"});
        }
        else{
            return res.status(200).json({msg: "Order Deleted Successfully"});
        }
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
});



OrderRouter.get('/orders/vendor/:vendorId',auth,vendorAuth, async (req, res) => {
    
    try {
        const{vendorId} = req.params;

        const orders = await Order.find({vendorId});

        // if(orders.length == 0){
        //     return res.status(404).json({msg: "No orders found"});
        // }

        return res.status(200).json(orders);

    } catch (e) {
        return res.status(500).json({error: e.message});
    }
});


OrderRouter.patch('/orders/:id/delivered', async (req ,res) => {
      console.log("PATCH delivered HIT");
    try {
        const {id} = req.params;

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            {delivered:true, processing: false},
            {new:true}
            
        );

        if(!updatedOrder){
            return res.status(404).json({msg: "Order not found"})
        }
        else{
            return res.status(200).json("Updated Order");
        }
    } catch (e) {
        return res.status(500).json({error: e.message});
        
    }
});


OrderRouter.patch('/orders/:id/processing', async (req ,res) => {
    try {
        const {id} = req.params;

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            {processing:false, delivered: false},
            {new:true}
            
        );

        if(!updatedOrder){
            return res.status(404).json({msg: "Order not found"})
        }
        else{
            return res.status(200).json("Updated Order");
        }
    } catch (e) {
        return res.status(500).json({error: e.message});
        
    }
});


OrderRouter.get('/orders',async (req, res) => {
    try {
        const orders = await Order.find();

        return res.status(200).json(orders);
    } catch (e) {
        return res.status(500).json({error: e.message});
    }
})
module.exports = OrderRouter;
