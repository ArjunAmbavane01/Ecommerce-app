import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import { AlertCircle, XCircle } from 'lucide-react';

export default function PurchaseHistory() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  const [alertMessage, setAlertMessage] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);

  useEffect(() => {
    if (user) {
      fetchPurchaseHistory();
    }
  }, [user]);

  const fetchPurchaseHistory = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/order/purchaseHistory', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setOrders(data.data);
        }
      }
    } catch (error) {
      console.error('Error fetching purchase history:', error);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/order/cancelOrder/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setOrders(orders.filter(order => order._id !== orderId));
          setAlertMessage({ type: 'success', message: `Order #${orderId} cancelled successfully `});

          setTimeout(() => {
            setAlertMessage(null);
          }, 3000);
        } else {
          setAlertMessage({ type: 'error', message: data.error || 'Failed to cancel order' });
        }
      } else {
        setAlertMessage({ type: 'error', message: 'Failed to cancel order' });
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      setAlertMessage({ type: 'error', message: 'An error occurred while cancelling the order' });
    }
    setShowConfirmDialog(false);
  };

  const handleCancelClick = (orderId) => {
    setOrderToCancel(orderId);
    setShowConfirmDialog(true);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="mt-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Purchase History</h1>
          <p>Please sign in to view your purchase history.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="mt-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Purchase History</h1>
        {alertMessage && (
          <div className={`p-4 mb-4 rounded-md ${alertMessage.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {alertMessage.type === 'error' ? <XCircle className="inline-block h-4 w-4 mr-2" /> : <AlertCircle className="inline-block h-4 w-4 mr-2" />}
            {alertMessage.message}
          </div>
        )}
        {orders.length === 0 ? (
          <p className="text-gray-400">You haven't made any purchases yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Order #{order._id.substr(order._id.length - 6)}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Placed on {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                  </div>
                  {order.status === 'Pending' && (
                    <button 
                      onClick={() => handleCancelClick(order._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-150 ease-in-out"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Status</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {order.status}
                        </span>
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Total Amount</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">₹{order.totalAmount.toLocaleString()}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Delivery Date</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {new Date(order.deliveryDate).toLocaleDateString()}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500 mb-4">Items</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                          {order.items.map((item, index) => (
                            <li key={index} className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
                              <div className="w-full flex items-center justify-between p-6 space-x-6">
                                <div className="flex-1 truncate">
                                  <div className="flex items-center space-x-3">
                                    <h3 className="text-gray-900 text-sm font-medium truncate">
                                      {item.productDetails ? `${item.productDetails.brand} ${item.productDetails.name}` : 'Product not found'}
                                    </h3>
                                  </div>
                                  <p className="mt-1 text-gray-500 text-sm truncate">₹{item.price.toLocaleString()}</p>
                                </div>
                                {item.productDetails && (
                                  <img className="w-30 h-20 rounded-md bg-gray-300 flex-shrink-0" src={item.productDetails.photoURL} alt={item.productDetails.name} />
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
            <p className="mb-4">This action cannot be undone. This will permanently cancel your order.</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-150 ease-in-out"
              >
                Cancel
              </button>
              <button
                onClick={() => cancelOrder(orderToCancel)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-150 ease-in-out"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}