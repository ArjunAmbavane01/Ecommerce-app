import React from 'react';
import { FiMenu, FiSearch, FiMapPin, FiUser, FiShoppingCart } from 'react-icons/fi';

const Header = () => (
    <header className="bg-black p-4 flex items-center justify-between">
        <button className="text-white flex items-center">
          <FiMenu className="mr-2" />
          Menu
        </button>
        <div className="flex-grow mx-4 relative">
          <input
            type="text"
            placeholder="What are you looking for ?"
            className="w-full p-2 pl-10 rounded-md bg-white text-black"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <FiMapPin className="mr-2" />
            <span>Pune, 411008</span>
          </div>
          <button className="mr-4">
            <FiUser size={24} />
          </button>
          <button className="relative">
            <FiShoppingCart size={24} />
            <span className="absolute -top-1 -right-1 bg-green-500 text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
          </button>
        </div>
      </header>
);

export default Header;