import React from 'react'
import { Link } from 'react-router-dom'
import { FiX } from 'react-icons/fi'
import { Laptop, ShoppingBag, Clock, House } from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
    return (
        <div className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
            <div className="flex justify-end p-4">
                <button onClick={onClose} className="text-white">
                    <FiX size={24} />
                </button>
            </div>
            <nav className="mt-8">
                <Link to="/" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800" onClick={onClose}>
                    <House className="mr-3" />
                    Home
                </Link>
                <Link to="/laptops/store" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800" onClick={onClose}>
                    <Laptop className="text-sm mr-3" />
                    Laptop Store
                </Link>
                <Link to="/purchase-history" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800" onClick={onClose}>
                    <Clock className="mr-3" />
                    Purchase History
                </Link>
                <Link to="/pending-orders" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800" onClick={onClose}>
                    <ShoppingBag className="mr-3" />
                    Current Orders Pending
                </Link>
            </nav>
        </div>
    )
}