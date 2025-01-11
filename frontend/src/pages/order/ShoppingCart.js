import React from 'react';
import { Trash2, ArrowRight } from 'lucide-react';
import Header from '../../components/Header';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LaptopShoppingCart() {
  const { cartItems, removeFromCart, calculateOrderSummary } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const orderSummary = calculateOrderSummary();

  const handleRemoveItem = async (itemId) => {
    await removeFromCart(itemId);
  };

  const handlePlaceOrder = () => {
    navigate('/checkout', { state: { cartItems, orderSummary } });
  };


  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="mt-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
          <p>Please sign in to view your cart.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="mt-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            {cartItems.length === 0 ? (
              <p className="text-gray-400">Your cart is empty</p>
            ) : (
              <ul>
                {cartItems.map(item => (
                  <div key={item._id} className="flex items-center bg-white p-6 mb-4 rounded-lg shadow">
                    <img src={item.photoURL} alt={item.name} className="w-20 h-20 object-cover mr-6" />
                    <div className="flex-grow">
                      <h2 className="text-2xl font-semibold text-gray-900">{item.name}</h2>
                      <p className="text-gray-500 text-sm mt-2 mb-2">{item.processor} | {item.ramSize} | {item.storageSize}</p>
                      <p className="text-gray-700 text-md">₹{item.price.toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="text-red-500 hover:text-red-700 mr-6"
                    >
                      <Trash2 className="w-7 h-7" />
                    </button>
                  </div>
                ))}
              </ul>
            )}
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
              <button
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md mt-6 hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                onClick={handlePlaceOrder}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button
                className="w-full text-blue-600 py-2 px-4 rounded-md mt-2 hover:bg-blue-50 transition duration-300"
                onClick={() => navigate('/laptops/store')}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}