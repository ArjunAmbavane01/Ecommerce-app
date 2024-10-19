const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const User = require('../models/userModel');
const Laptop = require('../models/laptopModel');
const requireAuth = require('../middleware/reqAuth');

router.post('/placeOrder', requireAuth, async (req, res) => {
    try {
        const { items, totalAmount, shippingAddress } = req.body;
        const user_id = req.id;

        const newOrder = new Order({
            user_id,
            items,
            totalAmount,
            shippingAddress,
            orderDate: new Date(),
            deliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
            status: 'Pending'
        });

        const savedOrder = await newOrder.save();

        await User.findByIdAndUpdate(user_id, { $set: { cart: [] } });

        return res.status(201).json({ success: true, data: savedOrder });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/purchaseHistory', requireAuth, async (req, res) => {
    try {
        const user_id = req.id;
        const orders = await Order.find({ user_id }).sort({ orderDate: -1 });

        // Fetch product details for each order
        const ordersWithProducts = await Promise.all(orders.map(async (order) => {
            const itemsWithDetails = await Promise.all(order.items.map(async (item) => {
                const product = await Laptop.findById(item.item_id);
                return {
                    ...item.toObject(),
                    productDetails: product ? {
                        name: product.name,
                        brand: product.brand,
                        photoURL: product.photoURL
                    } : null
                };
            }));

            return {
                ...order.toObject(),
                items: itemsWithDetails
            };
        }));

        return res.status(200).json({ success: true, data: ordersWithProducts });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

router.delete('/cancelOrder/:orderId', requireAuth, async (req, res) => {
    try {
        const { orderId } = req.params;
        const user_id = req.id;

        const order = await Order.findOne({ _id: orderId, user_id, status: 'Pending' });

        if (!order) {
            return res.status(404).json({ success: false, error: 'Order not found or cannot be cancelled' });
        }

        await Order.findByIdAndDelete(orderId);

        return res.status(200).json({ success: true, message: 'Order cancelled successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;