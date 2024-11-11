import React from 'react'
import { CircleX, CircleCheck } from 'lucide-react';

export default function Component({ isOpen, onClose, orderDetails }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Order Confirmation</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <CircleX className="h-6 w-6" />
            </button>
          </div>
          <div className="text-center mb-6">
            <CircleCheck  className="h-8 w-8 text-green-500 mx-auto mb-4" />
            <p className="text-xl font-semibold">We received your order!</p>
            <p className="text-gray-600">Your order #{orderDetails.orderNumber} is completed and ready to ship</p>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Shipping Address</h3>
            <p>{orderDetails.shippingAddress.name}</p>
            <p>{orderDetails.shippingAddress.street}</p>
            <p>{orderDetails.shippingAddress.cityStateZip}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Order Items</h3>
            {orderDetails.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded mr-4">
                  <img src={item.photoURL} alt={item.name} className="w-full h-full" />
                  </div>
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.color}</p>
                  </div>
                </div>
                <p className="font-semibold">₹{item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{orderDetails.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax</span>
              <span>₹{orderDetails.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>₹{orderDetails.shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold mt-2">
              <span>Total</span>
              <span>₹{orderDetails.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}