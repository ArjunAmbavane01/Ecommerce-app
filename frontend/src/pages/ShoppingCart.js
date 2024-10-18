import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import Header from '../components/Header';

export default function LaptopShoppingCart() {
  const [cartItems, setCartItems] = useState([]);
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    tax: 0,
    total: 0
  });

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    calculateOrderSummary();
  }, [cartItems]);

  const fetchCartItems = async () => {
    try {
      // const response = await fetch('http://localhost:4000/api/cart/getCartItems');
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
      // const data = await response.json();
      const data = [{
        "_id": {
          "$oid": "6710aee07906c3de9645a88c"
        },
        "name": "MacBook Pro 14",
        "brand": "Apple",
        "processor": "M1 Pro",
        "ramSize": "16GB",
        "storageSize": "512GB",
        "price": 199000,
        "rating": 4.8,
        "quantity": 10,
        "wishlist": true,
        "photoURL": "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697230830200",
        "os": "MacOS"
      },
      {
        "_id": {
          "$oid": "6710aee07906c3de9645a88d"
        },
        "name": "Dell XPS 13",
        "brand": "Dell",
        "processor": "Intel Core i7",
        "ramSize": "16GB",
        "storageSize": "1TB",
        "price": 135000,
        "rating": 4.5,
        "quantity": 5,
        "wishlist": false,
        "photoURL": "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/9345/media-gallery/touch/gray/notebook-xps-13-9345-t-gray-gallery-2.psd?fmt=pjpg&pscan=auto&scl=1&wid=3988&hei=2361&qlt=100,1&resMode=sharp2&size=3988,2361&chrss=full&imwidth=5000",
        "os": "Windows"
      },
      {
        "_id": {
          "$oid": "6710aee07906c3de9645a88c"
        },
        "name": "MacBook Pro 14",
        "brand": "Apple",
        "processor": "M1 Pro",
        "ramSize": "16GB",
        "storageSize": "512GB",
        "price": 199000,
        "rating": 4.8,
        "quantity": 10,
        "wishlist": true,
        "photoURL": "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697230830200",
        "os": "MacOS"
      },
      {
        "_id": {
          "$oid": "6710aee07906c3de9645a88d"
        },
        "name": "Dell XPS 13",
        "brand": "Dell",
        "processor": "Intel Core i7",
        "ramSize": "16GB",
        "storageSize": "1TB",
        "price": 135000,
        "rating": 4.5,
        "quantity": 5,
        "wishlist": false,
        "photoURL": "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/9345/media-gallery/touch/gray/notebook-xps-13-9345-t-gray-gallery-2.psd?fmt=pjpg&pscan=auto&scl=1&wid=3988&hei=2361&qlt=100,1&resMode=sharp2&size=3988,2361&chrss=full&imwidth=5000",
        "os": "Windows"
      }]
      // if (data.success) {
      //   setCartItems(data.cartItems);
      // } else {
      //   throw new Error('Failed to fetch cart items');
      // }
      setCartItems(data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const calculateOrderSummary = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.08; // Assuming 8% tax
    const total = subtotal + tax;

    setOrderSummary({
      subtotal,
      tax,
      total
    });
  };

  const updateQuantity = async (id, newQuantity) => {
    try {
      const response = await fetch('http://localhost:4000/api/cart/updateQuantity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: id, quantity: Math.max(0, newQuantity) })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.success) {
        setCartItems(prevItems =>
          prevItems.map(item =>
            item._id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
          )
        );
      } else {
        throw new Error('Failed to update quantity');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeItem = async (id) => {
    try {
      const response = await fetch('http://localhost:4000/api/cart/removeItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: id })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.success) {
        setCartItems(prevItems => prevItems.filter(item => item._id !== id));
      } else {
        throw new Error('Failed to remove item');
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="mt-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            {cartItems.map(item => (
              <div key={item._id} className="flex items-center bg-white p-6 mb-4 rounded-lg shadow">
                <img src={item.photoURL} alt={item.name} className="w-20 h-20 object-cover mr-6" />
                <div className="flex-grow">
                  <h2 className="text-2xl font-semibold text-gray-900">{item.name}</h2>
                  <p className="text-gray-500 text-sm mt-2 mb-2">{item.processor} | {item.ramSize} | {item.storageSize}</p>
                  <p className="text-gray-700 text-md">₹{item.price.toLocaleString()}</p>
                
                </div>

                <button
                  onClick={() => removeItem(item._id)}
                  className=" text-red-500 hover:text-red-700 mr-6"
                >
                  <Trash2 className="w-7 h-7" />
                </button>
              </div>
            ))}
          </div>
          <div className="md:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{orderSummary.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{orderSummary.tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>₹{orderSummary.total.toLocaleString()}</span>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md mt-6 hover:bg-blue-700 transition duration-300 flex items-center justify-center">
                Proceed to Checkout
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="w-full text-blue-600 py-2 px-4 rounded-md mt-2 hover:bg-blue-50 transition duration-300">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}