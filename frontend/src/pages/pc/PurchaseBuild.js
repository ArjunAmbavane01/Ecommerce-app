import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePCParts } from '../../contexts/PCPartsContext';
import defaultImage from '../../assets/default-laptop.png';
import axios from 'axios';
import Header from '../../components/Header';
import OrderConfirmation from '../../components/order/OrderConfirmation';

const PurchaseBuild = () => {
    const navigate = useNavigate();
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
                const { orderNumber, shippingAddress } = response.data;
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
                        photoURL: component.photoURL || defaultImage,
                    })),
                    subtotal: totalPrice,
                    tax: totalPrice * 0.1, 
                    shipping: 500, 
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
        navigate('/customize-pc');
    };

    return (
        <div className="container mx-auto bg-gray-100 ">
            <Header />
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg flex mt-8 ">
                <div className="w-1/2 p-8">
                    <img src="images/pcBuild.jpeg" alt="Product" className=" mt-14 w-full h-auto object-cover rounded-lg shadow-lg" />
                </div>
                <div className="w-1/2 p-6">
                    <h1 className="text-3xl font-bold mb-6">Purchase Your Custom PC</h1>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Selected Components:</h2>
                        <div className="grid grid-cols-1 gap-4 border-b pb-2">
                            {Object.entries(selectedComponents).map(([type, component]) => (
                                <div key={type} className="flex justify-between items-center">
                                    <span className="font-medium">{type}:</span>
                                    <div className="text-right">
                                        <div>{component.name}</div>
                                        <div className="text-gray-600">${component.price.toFixed(2)}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="text-xl font-bold mb-6 text-right">
                        Total Price: ${totalPrice.toFixed(2)}
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={handlePurchase}
                            disabled={isLoading}
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-gray-400"
                        >
                            {isLoading ? 'Processing...' : 'Confirm Purchase'}
                        </button>
                    </div>
                </div>
            </div>
            {orderDetails && (
                <OrderConfirmation
                    isOpen={isConfirmationOpen}
                    onClose={closeConfirmation}
                    orderDetails={orderDetails}
                />
            )}
        </div>
    );
};

export default PurchaseBuild;