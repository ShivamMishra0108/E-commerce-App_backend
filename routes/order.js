const express = require('express');
const OrderRouter = express.Router();
const Order = require('../models/order');


OrderRouter.post('/api/orders', async(req, res) => {
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

OrderRouter.get('/api/orders/:buyerId', async (req, res) => {
    
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

module.exports = OrderRouter;
