const express = require('express');
const Order = require('../../models/orderModel');

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
                $project: {
                    _id: 0,
                    year: "$_id.year",
                    month: "$_id.month",
                    totalSales: 1,
                    totalOrders: 1,
                    monthYear: {
                        $concat: [
                            { $switch: {
                                branches: [
                                    { case: { $eq: ["$_id.month", 1] }, then: "Jan" },
                                    { case: { $eq: ["$_id.month", 2] }, then: "Feb" },
                                    { case: { $eq: ["$_id.month", 3] }, then: "Mar" },
                                    { case: { $eq: ["$_id.month", 4] }, then: "Apr" },
                                    { case: { $eq: ["$_id.month", 5] }, then: "May" },
                                    { case: { $eq: ["$_id.month", 6] }, then: "Jun" },
                                    { case: { $eq: ["$_id.month", 7] }, then: "Jul" },
                                    { case: { $eq: ["$_id.month", 8] }, then: "Aug" },
                                    { case: { $eq: ["$_id.month", 9] }, then: "Sep" },
                                    { case: { $eq: ["$_id.month", 10] }, then: "Oct" },
                                    { case: { $eq: ["$_id.month", 11] }, then: "Nov" },
                                    { case: { $eq: ["$_id.month", 12] }, then: "Dec" }
                                ],
                                default: "Unknown"
                            }},
                            " ",
                            { $toString: "$_id.year" }
                        ]
                    }
                }
            },
            {
                $sort: { year: 1, month: 1 }
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
                $lookup: {
                    from: "laptops",
                    localField: "items.item_id",
                    foreignField: "_id",
                    as: "laptopDetails"
                }
            },
            { $unwind: "$laptopDetails" },
            {
                $group: {
                    _id: "$laptopDetails._id",
                    name: { $first: "$laptopDetails.name" },
                    brand: { $first: "$laptopDetails.brand" },
                    price: { $first: "$items.price" },
                    totalUnitsSold: { $sum: 1 },
                    totalRevenue: { $sum: "$items.price" }
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    brand: 1,
                    price: 1,
                    totalUnitsSold: 1,
                    totalRevenue: 1,
                    averagePrice: { $round: [{ $divide: ["$totalRevenue", "$totalUnitsSold"] }, 2] }
                }
            },
            { $sort: { totalUnitsSold: -1 } },
            { $limit: 10 }
        ]);
        return res.json({data: popularLaptops, success: true});
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching popular laptops', error });
    }
});

module.exports = router;