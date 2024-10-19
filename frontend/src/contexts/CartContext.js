import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCartItems();
    } else {
      setCartItems([]);
    }
  }, [user]);

  const fetchCartItems = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/order/getCartProducts', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setCartItems(data.data);
        }
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const addToCart = async (productId) => {
    if (!user) {
      return false; // User not authenticated
    }
    try {
      const response = await fetch(`http://localhost:4000/order/addToCartProduct/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          await fetchCartItems(); // Refresh cart items
          return true;
        }
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
    return false;
  };

  const value = {
    cartItems,
    addToCart,
    fetchCartItems
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);