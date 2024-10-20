const express = require('express');
const router = express.Router();
const Laptop = require('../models/laptopModel');
const User = require('../models/userModel');
const requireAuth = require('../middleware/reqAuth');

router.use(requireAuth);

router.post('/wishlist/add/:id', async (req, res) => {
    try {
        const laptop_id = req.params.id;
        const user_id = req.id;

        const updatedUser = await User.findByIdAndUpdate(
            user_id,
            { $addToSet: { wishlist: laptop_id } },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.status(200).json({ success: true, data: updatedUser.wishlist });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

router.post('/wishlist/remove/:id', async (req, res) => {
    try {
        const laptop_id = req.params.id;
        const user_id = req.id;

        const updatedUser = await User.findByIdAndUpdate(
            user_id,
            { $pull: { wishlist: laptop_id } },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.status(200).json({ success: true, data: updatedUser.wishlist });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/wishlist/getWishlist', async (req, res) => {
    try {
        const user_id = req.id;

        const user = await User.findById(user_id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const laptops = await Laptop.find({ _id: { $in: user.wishlist } });

        return res.status(200).json({ success: true, data: laptops });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/wishlist/check/:id', async (req, res) => {
    try {
        const laptop_id = req.params.id;
        const user_id = req.id;

        const user = await User.findById(user_id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const isWishlisted = user.wishlist.includes(laptop_id);

        return res.status(200).json({ success: true, isWishlisted });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;

