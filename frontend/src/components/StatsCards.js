import React, { useEffect, useState } from 'react';
import { ArrowUpRight, TrendingUp, Package, User } from 'lucide-react';

const StatsCards = ({ yearlyData, monthlyData }) => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [monthlyOrders, setMonthlyOrders] = useState(0);

  useEffect(() => {
    if (yearlyData.length > 0) {
      setTotalRevenue(yearlyData[yearlyData.length - 1].totalSales);
    }
    if (monthlyData.length > 0) {
      setMonthlyOrders(monthlyData[monthlyData.length - 1].totalOrders);
    }
  
  }, [yearlyData, monthlyData]);

  return (
    <>
      <StatsCard
        title="Total Revenue (2024)"
        value={totalRevenue.toLocaleString()}
        icon={TrendingUp}
        trend={(totalRevenue > 0 && yearlyData.length > 1)
          ? ((totalRevenue - yearlyData[yearlyData.length - 2].totalSales) / yearlyData[yearlyData.length - 2].totalSales * 100).toFixed(2)
          : null}
      />
      <StatsCard
        title="Monthly Orders"
        value={monthlyOrders.toLocaleString()}
        icon={Package}
      />
      <StatsCard
       title="New Customers"
       value="1,245"
       icon={User}
       trend="8.2"
      />
    </>
  );
};

const StatsCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-medium text-gray-400">{title}</h3>
      <Icon className="h-4 w-4 text-gray-500" />
    </div>
    <div className="text-2xl font-bold text-white">{value}</div>
    {trend && (
      <p className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
        <ArrowUpRight className="h-4 w-4" />
        {trend}% from last year
      </p>
    )}
  </div>
);

export default StatsCards;