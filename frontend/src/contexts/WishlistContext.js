import React, { createContext, useContext, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { user } = useAuth();

  const fetchWishlistItems = useCallback(async () => {
    if (!user) {
      setWishlistItems([]);
      return;
    }
    try {
      const response = await fetch('http://localhost:4000/api/wishlist/getWishlist', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Ensure each item is an object with an _id property
          const formattedItems = data.data.map(item => 
            typeof item === 'string' ? { _id: item } : item
          );
          setWishlistItems(formattedItems);
        }
      }
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
    }
  }, [user]);

  const addToWishlist = useCallback(async (laptopId) => {
    if (!user) {
      return false;
    }
    try {
      const response = await fetch(`http://localhost:4000/api/wishlist/add/${laptopId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setWishlistItems(prev => [...prev, { _id: laptopId }]);
          return true;
        }
      }
    } catch (error) {
      console.error('Error adding item to wishlist:', error);
    }
    return false;
  }, [user]);

  const removeFromWishlist = useCallback(async (laptopId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/wishlist/remove/${laptopId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setWishlistItems(prev => prev.filter(item => item._id !== laptopId));
          return true;
        }
      }
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
    return false;
  }, []);

  const isInWishlist = useCallback((laptopId) => {
    return wishlistItems.some(item => item._id === laptopId);
  }, [wishlistItems]);

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    fetchWishlistItems,
    isInWishlist
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => useContext(WishlistContext);