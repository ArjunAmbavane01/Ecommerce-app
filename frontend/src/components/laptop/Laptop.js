import React, { useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import defaultLaptopImage from '../../assets/default-laptop.png';

const Laptop = ({ laptop }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <img 
        src={imageError ? defaultLaptopImage : laptop.photoURL} 
        className="w-full h-48 object-cover" 
        onError={handleImageError}
        alt={laptop.name || 'Laptop'}
      />
      <div className="p-4">
        <h3 className="text-white text-lg font-semibold mb-2">
          {laptop.name || 'Model'}
        </h3>
        <p className="text-gray-300 text-sm mb-4">
          {laptop.processor || 'N/A'}{' '}
          {laptop.ramSize ? `${laptop.ramSize} RAM` : 'N/A'}{' '}
          {laptop.storageSize || 'N/A'}
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