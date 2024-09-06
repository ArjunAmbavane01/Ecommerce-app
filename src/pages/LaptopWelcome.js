import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const OSSection = ({ os, image }) => (
  <Link to={`/laptops?os=${os.toLowerCase()}`} className="relative flex-1">
    <img src={image} alt={os} className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <span className="text-white text-2xl font-bold">{os}</span>
    </div>
  </Link>
);

const BrandSection = ({ brand, image }) => (
  <Link to={`/laptops?brand=${brand.toLowerCase()}`} className="bg-white p-4 rounded-lg shadow-md">
    <img src={image} alt={brand} className="w-full h-32 object-contain" />
    <p className="text-center mt-2 font-semibold">{brand}</p>
  </Link>
);

const ScreenSizeSection = ({ size, label }) => (
  <Link to={`/laptops?screenSize=${size}`} className="bg-gray-800 text-white p-4 rounded-lg flex flex-col items-center justify-center">
    <span className="text-sm mb-1">{label}</span>
    <span className="text-2xl font-bold">{size}</span>
  </Link>
);

const LaptopWelcome = () => {
  return (
    <div className="bg-black text-white">
      <Header />
      <div className="relative overflow-hidden">
        <div className="w-full h-80 flex items-center justify-between">
          <div className="absolute inset-0 bg-gradient-to-r from-[#e6d1b5] to-transparent z-0"></div>
          <div className="flex flex-col justify-center px-8 w-full z-10">
            <h1 className="text-5xl font-bold mb-4 text-[#2c2c2c]">Laptops</h1>
            <h2 className="text-xl font-semibold text-[#2c2c2c]">Laptops That Bring Out the Best In You</h2>
          </div>
          <div className="w-1/2 h-full flex items-center justify-end relative">
            <img src="/images/laptop.jpg" alt="laptop" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
      <main className="max-w-6xl mx-auto p-6"> 
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Choose Your OS</h2>
          <div className="flex h-48 rounded-lg overflow-hidden">
            <div className="flex-1 relative group cursor-pointer">
              <img src="/images/mac.png" alt="macOS" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-lg font-semibold text-white">macOS</span>
              </div>
            </div>
            <div className="flex-1 relative group cursor-pointer">
              <img src="/images/windows.png" alt="Windows" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-lg font-semibold text-white">Windows</span>
              </div>
            </div>
            <div className="flex-1 relative group cursor-pointer">
              <img src="/images/chrome.png" alt="ChromeOS" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-lg font-semibold text-white">ChromeOS</span>
              </div>
            </div>
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Pick Your Laptop Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative h-40 rounded-lg overflow-hidden group cursor-pointer">
              <img src="/images/apple-logo.webp" alt="Apple" className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-xl font-semibold">Apple</span>
              </div>
            </div>
            <div className="relative h-40 rounded-lg overflow-hidden group cursor-pointer">
              <img src="/images/asus-logo.png" alt="ASUS" className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-xl font-semibold">ASUS</span>
              </div>
            </div>
            <div className="relative h-40 rounded-lg overflow-hidden group cursor-pointer">
              <img src="/images/lenovo-logo.png" alt="Lenovo" className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-xl font-semibold">Lenovo</span>
              </div>
            </div>
            <div className="relative h-40 rounded-lg overflow-hidden group cursor-pointer">
              <img src="/images/dell-logo.jpeg" alt="Dell" className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-xl font-semibold">Dell</span>
              </div>
            </div>
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Size Up Your Screen</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-800 text-white p-4 rounded-lg flex flex-col items-center justify-center">
              <span className="text-sm mb-1">Up to</span>
              <span className="text-2xl font-bold">12.99"</span>
            </div>
            <div className="bg-gray-800 text-white p-4 rounded-lg flex flex-col items-center justify-center">
              <span className="text-sm mb-1">13" to</span>
              <span className="text-2xl font-bold">14.99"</span>
            </div>
            <div className="bg-gray-800 text-white p-4 rounded-lg flex flex-col items-center justify-center">
              <span className="text-sm mb-1">15" to</span>
              <span className="text-2xl font-bold">16.99"</span>
            </div>
            <div className="bg-gray-800 text-white p-4 rounded-lg flex flex-col items-center justify-center">
              <span className="text-sm mb-1">Above</span>
              <span className="text-2xl font-bold">17"</span>
            </div>
          </div>
        </section>
      </main>
      </div>
    
  );
};

export default LaptopWelcome;