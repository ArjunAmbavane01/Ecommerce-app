
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, TrendingUp, Package, Laptop } from 'lucide-react';

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8">Welcome to Our Store</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link to="/laptops" className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Buy Laptops</h2>
              <p className="text-gray-600">Explore our wide range of laptops from top brands.</p>
            </div>
          </Link>
          <Link to="/customize-pc" className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Customize Your PC</h2>
              <p className="text-gray-600">Build your dream PC with our customization options.</p>
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Popular Laptop Models</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Top Selling</h3>
              <p className="text-emerald-400 text-2xl font-bold">Dell XPS 13</p>
              <p className="text-gray-400 text-sm">12,345 units sold</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Fastest Growing</h3>
              <p className="text-emerald-400 text-2xl font-bold">Lenovo ThinkPad X1</p>
              <p className="text-gray-400 text-sm">+28% from last month</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Most Reviewed</h3>
              <p className="text-emerald-400 text-2xl font-bold">HP Spectre x360</p>
              <p className="text-gray-400 text-sm">4.8/5 (2,456 reviews)</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/laptops/order-chart"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm transition-colors duration-300"
          >
            <TrendingUp className="h-5 w-5 mr-2" />
            View Order Statistics
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;