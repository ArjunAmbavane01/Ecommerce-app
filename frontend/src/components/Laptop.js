import React from 'react';
import { FiHeart } from 'react-icons/fi';

const Laptop = ({ laptop }) => {
  // Default image URL if no image is available
  const defaultImageUrl = '/images/dell-xps13.jpeg';

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <img 
        // src={laptop.images && laptop.images.length > 0 ? laptop.images[0] : defaultImageUrl} 
        src={defaultImageUrl} 
        alt={laptop.model || 'Laptop'} 
        className="w-full h-48 object-cover" 
      />
      <div className="p-4">
        <h3 className="text-white text-lg font-semibold mb-2">
          {laptop.brand || 'Unknown'} {laptop.model || 'Model'}
        </h3>
        <p className="text-gray-300 text-sm mb-4">
          {laptop.processor?.type || 'N/A'} {laptop.processor?.model || 'N/A'}, 
          {laptop.ram?.size || 'N/A'}GB RAM, 
          {laptop.storage?.capacity || 'N/A'}GB {laptop.storage?.type || 'N/A'}
        </p>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-white font-bold">
              ₹{(laptop.price || 0).toLocaleString()}
            </span>
            <div className="text-yellow-400 text-sm">
              {(laptop.rating || 0).toFixed(1)} ★ ({laptop.reviews?.length || 0})
            </div>
          </div>
          <div className="flex items-center">
            <button className="text-white mr-2">
              <FiHeart className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Laptop;