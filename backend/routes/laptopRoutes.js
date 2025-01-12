const express = require('express');
const router = express.Router();
const Laptop = require('../models/laptopModel');

router.post('/addLaptop', async (req, res) => {
    try {
        const { name, brand, processor, ramSize, storageSize, price, os, rating, quantity, wishlist, photoURL } = req.body;

        const newLaptop = new Laptop({
            name,
            brand,
            processor,
            ramSize,
            storageSize,
            price,
            os,
            rating,
            quantity,
            wishlist,
            photoURL,
        });

        const savedLaptop = await newLaptop.save();
        return res.status(201).json({ success: true, data: savedLaptop });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/getLaptopsByFilters', async (req, res) => {
    try {
        console.log(req.query)
        const { os, brand, processor, ramSize, price, rating } = req.query;

        let filter = {};

        if (os) filter.os = os;
        if (brand) filter.brand = brand;
        if (processor) filter.processor = processor;
        if (ramSize) filter.ramSize = ramSize;
        if (price) filter.price = { $lte: price };
        if (rating) filter.rating = { $gte: rating };

        console.log(filter)

        const laptops = await Laptop.find(filter);

        return res.status(200).json({ success: true, data: laptops });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

router.put('/updateLaptop/:id', async (req, res) => {
    try {
        const updatedLaptop = await Laptop.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedLaptop) {
            return res.status(404).json({ success: false, message: 'Laptop not found' });
        }

        return res.status(200).json({ success: true, data: updatedLaptop });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

router.delete('/deleteLaptop/:id', async (req, res) => {
    try {
        const deletedLaptop = await Laptop.findByIdAndDelete(req.params.id);

        if (!deletedLaptop) {
            return res.status(404).json({ success: false, message: 'Laptop not found' });
        }

        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const laptop = await Laptop.findById(req.params.id);
        if (!laptop) {
            return res.status(404).json({ success: false, message: 'Laptop not found' });
        }
        res.json({ success: true, laptop });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


module.exports = router;
