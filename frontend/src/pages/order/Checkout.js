import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OrderConfirmation from '../../components/order/OrderConfirmation';
import Header from '../../components/Header';
import { useCart } from '../../contexts/CartContext';

export default function Component() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    addressLine: '',
    city: '',
    state: '',
    postalCode: ''
  })

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [orderSummary, setOrderSummary] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      const { cartItems, orderSummary } = location.state;
      setCartItems(cartItems);
      setOrderSummary(orderSummary);
    } else {
      // Handle the case where no state was passed
      console.error('No cart items or order summary found');
      // Optionally, redirect back to the cart page
      // navigate('/cart');
    }
  }, [location, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const { clearCart } = useCart();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/order/placeOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            item_id: item._id,
            price: item.price
          })),
          totalAmount: orderSummary.total,
          shippingAddress: {
            name: `${formData.firstName} ${formData.lastName}`,
            street: formData.addressLine,
            cityStateZip: `${formData.city}, ${formData.state} ${formData.postalCode}`
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setOrderDetails({
            orderNumber: data.data._id,
            shippingAddress: {
              name: `${formData.firstName} ${formData.lastName}`,
              street: formData.addressLine1,
              cityStateZip: `${formData.city}, ${formData.state} ${formData.postalCode}`
            },
            items: cartItems,
            subtotal: orderSummary.subtotal,
            tax: orderSummary.tax,
            shipping: 10, 
            total: orderSummary.total
          });
          setIsModalOpen(true);
          clearCart();
        }
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-2/3 px-4 mb-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                <div className="flex flex-wrap -mx-2 mb-4">
                  <div className="w-full md:w-1/2 px-2 mb-4">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-2 mb-4">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="addressLine" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    id="addressLine"
                    name="addressLine"
                    value={formData.addressLine}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="flex flex-wrap -mx-2 mb-4">
                  <div className="w-full md:w-1/2 px-2 mb-4">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-2 mb-4">
                  <div className="w-full md:w-1/2 px-2 mb-4">
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-2 mb-4">
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">Postal code</label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800">
                Confirm payment
              </button>
            </form>
          </div>
          <div className="w-full lg:w-1/3 px-4">
            <div className="bg-gray-100 p-6 rounded">
              <h2 className="text-xl font-semibold mb-4">Order details</h2>
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded mr-4">
                    <img src={item.photoURL} alt={item.name} className="w-full h-full" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.processor} | {item.ramSize} | {item.storageSize}</p>
                    </div>
                  </div>
                  <div className="font-semibold">₹{item.price.toLocaleString()}</div>
                </div>
              ))}
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>₹{orderSummary.subtotal?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Tax</span>
                  <span>₹{orderSummary.tax?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold mt-4">
                  <span>Total</span>
                  <span>₹{orderSummary.total?.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <OrderConfirmation
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            navigate('/cart');
          }}
          orderDetails={orderDetails}
        />
      </div>
    </>
  )
}