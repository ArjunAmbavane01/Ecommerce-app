const express = require('express');
const router = express.Router();
const Laptop = require('../models/laptopModel');
const User = require('../models/userModel');
const requireAuth = require('../middleware/reqAuth');

router.use(requireAuth);

router.post('/addToCartProduct/:id', async (req, res) => {
    try {
        const laptop_id = req.params.id;
        const user_id = req.id;

        const updatedUser = await User.findByIdAndUpdate(
            user_id,
            { $addToSet: { cart: { item_id: laptop_id } } },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.status(200).json({ success: true, data: updatedUser.cart });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/getCartProducts', requireAuth, async (req, res) => {
    try {
        const user_id = req.id; 

        const user = await User.findById(user_id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const laptopIds = user.cart.map(item => item.item_id).filter(Boolean); 

        const laptops = await Laptop.find({ _id: { $in: laptopIds } }, 'name brand os processor ramSize storageSize price photoURL');

        return res.status(200).json({ success: true, data: laptops });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
});

router.delete('/removeFromCart/:id', async (req, res) => {
    try {
        const laptop_id = req.params.id;
        const user_id = req.id;

        const updatedUser = await User.findByIdAndUpdate(
            user_id,
            { $pull: { cart: { item_id: laptop_id } } },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.status(200).json({ success: true, data: updatedUser.cart });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;

