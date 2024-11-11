const express = require('express');
const router = express.Router();
const PC = require('../models/pcModel');
const PCPart = require('../models/pcPartsModel');
const User = require('../models/userModel');
const requireAuth = require('../middleware/reqAuth');

router.get('/pcparts', async (req, res) => {
    try {
        const pcParts = await PCPart.find();
        res.status(200).json(pcParts);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch PC parts', error: err });
    }
});

// PC parts by type
router.get('/pcparts/:type', async (req, res) => {
    const type = req.params.type;
    try {
        const pcParts = await PCPart.find({ type });
        res.status(200).json(pcParts);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch PC parts', error: err });
    }
});

router.post('/purchase', requireAuth, async (req, res) => {
    try {
        const { components, totalPrice } = req.body;
        const user_id = req.id;

        if (!components || !totalPrice || typeof totalPrice !== 'number') {
            return res.status(400).json({ success: false, error: 'Invalid input data' });
        }

        const newPC = new PC({
            user_id,
            components,
            totalPrice,
            orderDate: new Date(),
            status: 'Processing'
        });

        const savedPC = await newPC.save();

        await User.findByIdAndUpdate(user_id, {
            $push: {
                purchaseHistory: {
                    item_id: savedPC._id,
                    date: savedPC.orderDate,
                    price: savedPC.totalPrice
                }
            }
        });

        return res.status(201).json({
            success: true,
            data: savedPC,
            orderNumber: savedPC._id,
            shippingAddress: await User.findById(user_id).select('name email phNo')
        });
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/purchaseHistory', requireAuth, async (req, res) => {
    try {
        const user_id = req.id;
        const pcs = await PC.find({ user_id }).sort({ orderDate: -1 });

        return res.status(200).json({ success: true, data: pcs });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

router.delete('/cancelOrder/:orderId', requireAuth, async (req, res) => {
    try {
        const { orderId } = req.params;
        const user_id = req.id;

        const pc = await PC.findOne({ _id: orderId, user_id, status: 'Processing' });

        if (!pc) {
            return res.status(404).json({ success: false, error: 'Order not found or cannot be cancelled' });
        }

        await PC.findByIdAndDelete(orderId);

        await User.findByIdAndUpdate(user_id, {
            $pull: {
                purchaseHistory: { item_id: orderId }
            }
        });

        return res.status(200).json({ success: true, message: 'PC order cancelled successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});


module.exports = router;
