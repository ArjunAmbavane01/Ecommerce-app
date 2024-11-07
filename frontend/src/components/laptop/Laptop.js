import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FiHeart } from 'react-icons/fi';
import defaultLaptopImage from '../../assets/default-laptop.png';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useAuth } from '../../contexts/AuthContext';

const Laptop = ({ laptop, onRemoveFromWishlist }) => {
  const [imageError, setImageError] = useState(false);
  const [isHeartAnimating, setIsHeartAnimating] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    setIsWishlisted(isInWishlist(laptop._id));
  }, [laptop._id, isInWishlist]);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const handleAddToCart = useCallback(async () => {
    if (!user) {
      alert('Please sign in to add items to your cart');
      return;
    }
    const success = await addToCart(laptop._id);
    if (success) {
      alert('Item added to cart');
      if (onRemoveFromWishlist) {
        onRemoveFromWishlist(laptop._id);
      }
    } else {
      alert('Failed to add item to cart');
    }
  }, [user, addToCart, laptop._id, onRemoveFromWishlist]);

  const handleWishlist = useCallback(async () => {
    if (!user) {
      alert('Please sign in to manage your wishlist');
      return;
    }
    try {
      let success;
      if (isWishlisted) {
        success = await removeFromWishlist(laptop._id);
        if (success && onRemoveFromWishlist) {
          onRemoveFromWishlist(laptop._id);
        }
      } else {
        console.log(laptop._id)
        success = await addToWishlist(laptop._id);
      }
      if (success) {
        setIsWishlisted(prev => !prev);
        setIsHeartAnimating(true);
        setTimeout(() => setIsHeartAnimating(false), 300);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
      alert('Failed to update wishlist');
    }
  }, [user, isWishlisted, removeFromWishlist, addToWishlist, laptop._id, onRemoveFromWishlist]);

  const heartClassName = useMemo(() => {
    return `h-6 w-6 transition-colors duration-300 ${isWishlisted ? 'fill-current text-red-500' : ''}`;
  }, [isWishlisted]);

  const buttonClassName = useMemo(() => {
    return `text-white mr-2 ${isHeartAnimating ? 'animate-wiggle' : ''}`;
  }, [isHeartAnimating]);

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
            <button
              className={buttonClassName}
              onClick={handleWishlist}
            >
              <FiHeart className={heartClassName} />
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

export default React.memo(Laptop);