const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');

const requireAuth = require('../middleware/reqAuth');
router.use(requireAuth);

router.post('/addCartOrders', requireAuth, async (req, res) => {
    try {
        const { items, totalAmount } = req.body;

        const newOrder = new Order({
            user_id: req.id,
            items: items.map(item => ({
                item_id: item.item_id, 
                price: item.price 
            })),
            totalAmount: totalAmount, 
            orderDate: new Date(), 
            deliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
            status: 'Pending' 
        });

        const savedOrder = await newOrder.save();
        return res.status(201).json({ success: true, data: savedOrder }); 
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
