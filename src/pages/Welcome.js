import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8">Welcome to Our Store</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </div>
    </div>
  );
};

export default Welcome;