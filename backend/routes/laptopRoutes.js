const express = require('express');
const router = express.Router();
const Laptop = require('../models/laptop');

router.post('/addLaptop', async (req, res) => {
    try {
        const { name, brand, processor, ramSize, storageSize, price, rating, quantity, wishlist, photoURL } = req.body;

        const newLaptop = new Laptop({
            name,
            brand,
            processor,
            ramSize,
            storageSize,
            price,
            rating,
            quantity,
            wishlist,
            photoURL,
        });

        const savedLaptop = await newLaptop.save();
        res.status(201).json({ success: true, data: savedLaptop });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/getLaptopsByFilters', async (req, res) => {
    try {
        const { brand, processor, ramSize, price, rating } = req.query;

        let filter = {};

        if (brand) filter.brand = brand;
        if (processor) filter.processor = processor;
        if (ramSize) filter.ramSize = ramSize;
        if (price) filter.price = { $lte: price }; 
        if (rating) filter.rating = { $gte: rating }; 

        const laptops = await Laptop.find(filter);

        res.status(200).json({ success: true, data: laptops });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
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

        res.status(200).json({ success: true, data: updatedLaptop });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete('/deleteLaptop/:id', async (req, res) => {
    try {
        const deletedLaptop = await Laptop.findByIdAndDelete(req.params.id);

        if (!deletedLaptop) {
            return res.status(404).json({ success: false, message: 'Laptop not found' });
        }

        res.status(200).json({ success: true, message: 'Laptop deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
