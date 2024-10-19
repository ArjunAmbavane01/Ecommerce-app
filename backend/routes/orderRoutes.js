const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const requireAuth = require('../middleware/reqAuth');

router.post('/placeOrder', requireAuth, async (req, res) => {
    try {
        const { items, totalAmount } = req.body;
        const user_id = req.id;

        const newOrder = new Order({
            user_id,
            items,
            totalAmount,
            orderDate: new Date(),
            deliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
            status: 'Pending'
        });

        const savedOrder = await newOrder.save();
        console.log('hi')
        // Clear user cart
        // await User.findByIdAndUpdate(user_id, { $set: { cart: [] } });

        return res.status(201).json({ success: true, data: savedOrder });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/purchaseHistory', requireAuth, async (req, res) => {
    try {
        const user_id = req.id;
        const orders = await Order.find({ user_id }).sort({ orderDate: -1 });
        return res.status(200).json({ success: true, data: orders });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// {
//     "items": [
//         {
//             "item_id": "laptop_object_id_1",
//             "quantity": 1,
//             "price": 1000
//         },
//         {
//             "item_id": "laptop_object_id_2",
//             "quantity": 2,
//             "price": 1500
//         }
//     ],
//         "totalAmount": 4000
// }


module.exports = router;
