import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const OrderStatsCharts = () => {
  const [yearlyOrders, setYearlyOrders] = useState([]);
  const [monthlyOrders, setMonthlyOrders] = useState([]);
  const [popularLaptops, setPopularLaptops] = useState([]);

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzEwY2U0OWY4MmVhNDRmZmQxMTI5MDQiLCJpYXQiOjE3Mjk0NjE1ODQsImV4cCI6MTcyOTcyMDc4NH0.NJhRivPXimE3soVPkoihCD-9_iyaDuYP91lTrKKEp_g";

  const fetchYearlyOrders = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/order/stats/getOrdersYearly', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setYearlyOrders(response.data.data);
    } catch (error) {
      console.error('Error fetching yearly orders:', error);
    }
  };

  const fetchMonthlyOrders = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/order/stats/getOrdersMonthly', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMonthlyOrders(response.data.data);
    } catch (error) {
      console.error('Error fetching monthly orders:', error);
    }
  };

  const fetchPopularLaptops = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/order/stats/getPopularLaptops', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPopularLaptops(response.data.data);
    } catch (error) {
      console.error('Error fetching popular laptops:', error);
    }
  };

  useEffect(() => {
    fetchYearlyOrders();
    fetchMonthlyOrders();
    fetchPopularLaptops();
  }, []);

  return (
    <div>
      <h2>Yearly Orders</h2>
      <BarChart width={600} height={300} data={yearlyOrders}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalSales" fill="#8884d8" />
      </BarChart>

      <h2>Monthly Orders</h2>
      <BarChart width={600} height={300} data={monthlyOrders}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalSales" fill="#82ca9d" />
      </BarChart>

      <h2>Popular Laptops</h2>
      <BarChart width={600} height={300} data={popularLaptops}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalUnitsSold" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default OrderStatsCharts;
