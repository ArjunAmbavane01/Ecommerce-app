import React, { useState } from 'react';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import defaultLaptopImage from '../../assets/default-laptop.png';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';

const Laptop = ({ laptop }) => {
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleImageError = () => {
    setImageError(true);
  };

  const handleAddToCart = async () => {
    if (!user) {
      alert('Please sign in to add items to your cart');
      return;
    }
    const success = await addToCart(laptop._id);
    if (success) {
      alert('Item added to cart');
    } else {
      alert('Failed to add item to cart');
    }
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
            <button
              className="bg-slate-600 text-white font-semibold px-3 ml-2 py-2 rounded-lg shadow-lg flex items-center"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Laptop;