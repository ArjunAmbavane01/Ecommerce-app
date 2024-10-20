const express = require('express');
const Order = require('../../models/orderModel');
const Laptop = require('../../models/laptopModel');

const router = express.Router();

// Get total sales over the years
router.get('/getOrdersYearly', async (req, res) => {
    try {
        const salesData = await Order.aggregate([
            {
                $group: {
                    _id: { $year: "$orderDate" },
                    totalSales: { $sum: "$totalAmount" },
                    totalOrders: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        return res.json({ data: salesData, success: true });

    } catch (error) {
        return res.status(500).json({ message: 'Error fetching sales data', error });
    }
});

// Get sales by laptop model
router.get('/getOrdersByLaptopModel', async (req, res) => {
    try {
        const salesData = await Order.aggregate([
            { $unwind: "$items" },
            {
                $lookup: {
                    from: "laptops",
                    localField: "items.item_id",
                    foreignField: "_id",
                    as: "laptop"
                }
            },
            { $unwind: "$laptop" },
            {
                $group: {
                    _id: "$laptop.name",
                    totalSales: { $sum: "$items.price" },
                    totalUnitsSold: { $sum: 1 }
                }
            },
            {
                $sort: { totalSales: -1 }
            }
        ]);
        return res.json({ data: salesData, success: true });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching sales data', error });
    }
});

// Get monthly sales report
router.get('/getOrdersMonthly', async (req, res) => {
    try {
        const salesData = await Order.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$orderDate" },
                        month: { $month: "$orderDate" }
                    },
                    totalSales: { $sum: "$totalAmount" },
                    totalOrders: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 }
            }
        ]);
        return res.json({ data: salesData, success: true });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching monthly sales data', error });
    }
});

// Get most popular laptops
router.get('/getPopularLaptops', async (req, res) => {
    try {
        const popularLaptops = await Order.aggregate([
            { $unwind: "$items" },
            {
                $group: {
                    _id: "$items.item_id",
                    totalUnitsSold: { $sum: 1 }
                }
            },
            { $sort: { totalUnitsSold: -1 } },
            { $limit: 10 },
            {
                $lookup: {
                    from: "laptops",
                    localField: "_id",
                    foreignField: "_id",
                    as: "laptopDetails"
                }
            },
            { $unwind: "$laptopDetails" },
            {
                $project: {
                    _id: "$laptopDetails._id",
                    name: "$laptopDetails.name",
                    brand: "$laptopDetails.brand",
                    totalUnitsSold: 1
                }
            }
        ]);
        return res.json({data: popularLaptops, success: true});
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching popular laptops', error });
    }
});

module.exports = router;