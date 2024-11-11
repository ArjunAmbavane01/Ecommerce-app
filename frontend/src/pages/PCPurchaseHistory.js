import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import Header from '../components/Header';
import { ChevronUp, ChevronDown } from 'lucide-react';

const PCPurchaseHistory = () => {
  const { user } = useAuth();
  const [pcPurchaseHistory, setPCPurchaseHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const componentTypes = [
    { name: 'CPU', url: '/images/CPU.svg' },
    { name: 'GPU', url: '/images/GPU.svg' },
    { name: 'Case', url: '/images/Case.svg' },
    { name: 'Motherboard', url: '/images/Motherboard.svg' },
    { name: 'Power Supply', url: '/images/SMPS.svg' },
    { name: 'RAM', url: '/images/RAM.svg' },
    { name: 'Storage', url: '/images/Storage.svg' },
  ];

  useEffect(() => {
    const fetchPCPurchaseHistory = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/api/pc/purchaseHistory', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.data.success) {
          setPCPurchaseHistory(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching PC purchase history:', error);
      }
      setIsLoading(false);
    };

    if (user) {
      fetchPCPurchaseHistory();
    }
  }, [user]);
  console.log(pcPurchaseHistory)

  const cancelOrder = async (orderId) => {
    try {
      await axios.delete(`/api/pc/cancelOrder/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPCPurchaseHistory(pcPurchaseHistory.filter(order => order._id !== orderId));
    } catch (error) {
      console.error('Error cancelling PC order:', error);
    }
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
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
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">PC Purchase History</h1>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {pcPurchaseHistory.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Order #{order._id.slice(-6)}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Placed on {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'Processing'
                          ? 'bg-yellow-100 text-yellow-800'
                          : order.status === 'Shipped'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                    >
                      {order.status}
                    </span>
                    {order.status === 'Processing' && (
                      <button
                        onClick={() => cancelOrder(order._id)}
                        className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-150 ease-in-out"
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
                <div className="border-t border-gray-200">
                  <div
                    className="px-6 py-4 flex justify-between items-center cursor-pointer"
                    onClick={() => toggleOrderDetails(order._id)}
                  >
                    <h4 className="text-gray-900 font-medium">View PC Build</h4>
                    {expandedOrderId === order._id ? (
                      <ChevronUp className="h-6 w-6 text-gray-600" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-gray-600" />
                    )}
                  </div>
                  {expandedOrderId === order._id && (
                    <div className="px-6 pb-4">
                      <h4 className="text-gray-900 font-medium mb-4">Ordered Components:</h4>
                      <ul className="space-y-4">
                        {Object.entries(order.components).map(([type, name], index) => {
                          const component = componentTypes.find((c) => c.name === type);
                          return (
                            <li key={index} className=" flex items-center">
                              <div className="w-8 h-8 mr-4">
                                <img src={component?.url || '/images/placeholder.svg'} />
                              </div>
                              <div>
                                <p className="text-gray-900 font-medium">{name}</p>
                                <p className="text-gray-500 text-sm">{type}</p>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PCPurchaseHistory;