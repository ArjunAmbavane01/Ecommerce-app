import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { usePCParts } from '../../contexts/PCPartsContext';
import axios from 'axios';
import Header from '../../components/Header';
import OrderConfirmation from '../../components/order/OrderConfirmation';

const PurchaseBuild = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { selectedComponents } = usePCParts();
    const [isLoading, setIsLoading] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);

    const totalPrice = Object.values(selectedComponents).reduce((sum, component) => sum + component.price, 0);

    const handlePurchase = async () => {
        setIsLoading(true);
        try {
            const simplifiedComponents = Object.entries(selectedComponents).reduce((acc, [type, component]) => {
                acc[type] = component.name;
                return acc;
            }, {});

            const response = await axios.post('http://localhost:4000/api/pc/purchase', {
                components: simplifiedComponents,
                totalPrice,
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                const { data, orderNumber, shippingAddress } = response.data;
                setOrderDetails({
                    orderNumber,
                    shippingAddress: {
                        name: shippingAddress.name,
                        street: `${shippingAddress.email}`,
                        cityStateZip: `Phone: ${shippingAddress.phNo}`
                    },
                    items: Object.values(selectedComponents).map(component => ({
                        name: component.name,
                        price: component.price,
                        photoURL: component.photoURL || '/placeholder-image.jpg',
                        color: component.color || 'N/A'
                    })),
                    subtotal: totalPrice,
                    tax: totalPrice * 0.1, // Assuming 10% tax
                    shipping: 500, // Assuming flat shipping rate
                    total: totalPrice + (totalPrice * 0.1) + 500
                });
                setIsConfirmationOpen(true);
            }
        } catch (error) {
            console.error('Purchase failed:', error);
            alert('Purchase failed. Please try again.');
        }
        setIsLoading(false);
    };

    const closeConfirmation = () => {
        setIsConfirmationOpen(false);
        navigate('/orders');
    };

    return (
        <>
            <Header />
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6">Purchase Your Custom PC</h1>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Selected Components:</h2>
                    <ul className="space-y-2">
                        {Object.entries(selectedComponents).map(([type, component]) => (
                            <li key={type} className="flex justify-between items-center border-b pb-2">
                                <span className="font-medium">{type}:</span>
                                <div className="text-right">
                                    <div>{component.name}</div>
                                    <div className="text-gray-600">₹{component.price.toFixed(2)}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="text-xl font-bold mb-6 text-right">
                    Total Price: ₹{totalPrice.toFixed(2)}
                </div>
                <button
                    onClick={handlePurchase}
                    disabled={isLoading}
                    className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-gray-400 text-lg font-semibold"
                >
                    {isLoading ? 'Processing...' : 'Confirm Purchase'}
                </button>
            </div>
            {orderDetails && (
                <OrderConfirmation
                    isOpen={isConfirmationOpen}
                    onClose={closeConfirmation}
                    orderDetails={orderDetails}
                />
            )}
        </>
    );
};

export default PurchaseBuild;