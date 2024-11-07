import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, TrendingUp, Package, Laptop } from 'lucide-react';

const OrderStatsCharts = () => {
    const [yearlyOrders, setYearlyOrders] = useState([]);
    const [monthlyOrders, setMonthlyOrders] = useState([]);
    const [popularLaptops, setPopularLaptops] = useState([]);

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzEwY2U0OWY4MmVhNDRmZmQxMTI5MDQiLCJpYXQiOjE3Mjk0NjE1ODQsImV4cCI6MTcyOTcyMDc4NH0.NJhRivPXimE3soVPkoihCD-9_iyaDuYP91lTrKKEp_g";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [yearlyRes, monthlyRes, laptopsRes] = await Promise.all([
                    fetch('http://localhost:4000/api/order/stats/getOrdersYearly', {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    fetch('http://localhost:4000/api/order/stats/getOrdersMonthly', {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    fetch('http://localhost:4000/api/order/stats/getPopularLaptops', {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                ]);

                const [yearlyData, monthlyData, laptopsData] = await Promise.all([
                    yearlyRes.json(),
                    monthlyRes.json(),
                    laptopsRes.json()
                ]);

                console.log(laptopsData.data);
                setYearlyOrders(yearlyData.data);
                setMonthlyOrders(monthlyData.data);
                setPopularLaptops(laptopsData.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <p className="text-gray-300 font-medium mb-1">{label}</p>
                    <p className="text-emerald-400 font-semibold">
                        {payload[0].dataKey === "totalUnitsSold" ? (
                            <>Units Sold: {payload[0].value}</>
                        ) : (
                            <>₹{payload[0].value.toLocaleString()}</>
                        )}
                    </p>
                    {payload[0].payload.averagePrice && (
                        <p className="text-blue-400 text-sm mt-1">
                            Price: ₹{payload[0].payload.price.toLocaleString()}
                        </p>
                    )}
                </div>
            );
        }
        return null;
    };

    const StatsCard = ({ title, value, icon: Icon, trend }) => (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-400">{title}</h3>
                <Icon className="h-4 w-4 text-gray-500" />
            </div>
            <div className="text-2xl font-bold text-white">₹{value}</div>
            {trend && (
                <p className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
                    <ArrowUpRight className="h-4 w-4" />
                    {trend}% from last month
                </p>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-black p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-8">Sales Dashboard</h1>

                <div className="grid gap-6 md:grid-cols-3 mb-8">
                    <StatsCard
                        title="Total Revenue (2024)"
                        value="4,935,690"
                        icon={TrendingUp}
                        trend="12.5"
                    />
                    <StatsCard
                        title="Monthly Orders"
                        value="1,245,230"
                        icon={Package}
                    />
                    <StatsCard
                        title="Popular Models Sold"
                        value="842"
                        icon={Laptop}
                    />
                </div>

                <div className="grid gap-6 md:grid-cols-2 mb-6">
                    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Yearly Sales Trend</h3>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={yearlyOrders}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                    <XAxis dataKey="_id" stroke="#9CA3AF" />
                                    <YAxis stroke="#9CA3AF" />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar dataKey="totalSales" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Monthly Sales Distribution</h3>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={monthlyOrders}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                    <XAxis
                                        dataKey="monthYear"
                                        stroke="#9CA3AF"
                                        angle={-45}
                                        textAnchor="end"
                                        height={60}
                                    />
                                    <YAxis stroke="#9CA3AF" />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar dataKey="totalSales" fill="#10B981" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Popular Laptop Models</h3>
                    <div className="h-[550px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={popularLaptops}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis
                                    dataKey="name"
                                    stroke="#9CA3AF"
                                    angle={-45}
                                    textAnchor="end"
                                    height={120}
                                    interval={0}
                                />
                                <YAxis stroke="#9CA3AF" />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Bar
                                    dataKey="totalUnitsSold"
                                    name="Units Sold"
                                    fill="#3B82F6"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderStatsCharts;