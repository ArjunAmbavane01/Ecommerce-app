import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();

  const clearCart = () => {
    setCartItems([]);
  };

  useEffect(() => {
    if (user) {
      fetchCartItems();
    } else {
      setCartItems([]);
    }
  }, [user]);

  const fetchCartItems = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/product/getCartProducts', {
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
      return false;
    }
    try {
      const response = await fetch(`http://localhost:4000/api/product/addToCartProduct/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          await fetchCartItems();
          return true;
        }
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
    return false;
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/product/removeFromCart/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          await fetchCartItems();
          return true;
        }
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
    return false;
  };

  const calculateOrderSummary = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const value = {
    cartItems,
    addToCart,
    clearCart,
    removeFromCart,
    fetchCartItems,
    calculateOrderSummary
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);