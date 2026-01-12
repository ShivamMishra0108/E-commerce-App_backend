const express = require('express');
const orderRouter = express.Router();
const Order = require('../models/order');


orderRouter.post('/order', async(req, res) => {
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
        } = req.body;

        const createdAt = new Date().now()

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
            createdAt
        });

        await order.save();
        return res.status(201).json(order);
    } catch (e) {
        return res.status(500).json({error: e.message});

    }
});

module.exports = orderRouter;
