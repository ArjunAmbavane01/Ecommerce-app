import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import ProcessorSection from '../../components/laptop/ProcessorSection';

const OSSection = ({ os, image }) => {
  const navigate = useNavigate();

  const handleOSClick = () => {
    const existingFilters = JSON.parse(localStorage.getItem('laptopFilters') || '{}');
    const newFilters = { ...existingFilters, os, brand: '', price: '', processor: '', ram: '', rating: '' };
    localStorage.setItem('laptopFilters', JSON.stringify(newFilters));
    navigate('/laptops/store', { state: { filters: newFilters } });
  };

  return (
    <div onClick={handleOSClick} className="relative flex-1 group cursor-pointer">
      <img src={image} alt={os} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-lg font-semibold text-white">{os}</span>
      </div>
    </div>
  );
};

const BrandSection = ({ brand, image }) => {
  const navigate = useNavigate();

  const handleBrandClick = () => {
    const existingFilters = JSON.parse(localStorage.getItem('laptopFilters') || '{}');
    const newFilters = { ...existingFilters, brand, os: '', price: '', processor: '', ram: '', rating: '' };
    localStorage.setItem('laptopFilters', JSON.stringify(newFilters));
    navigate('/laptops/store', { state: { filters: newFilters } });
  };

  return (
    <div onClick={handleBrandClick} className="relative h-40 rounded-lg overflow-hidden group cursor-pointer">
      <img src={image} alt={brand} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
      <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-white text-xl font-semibold">{brand}</span>
      </div>
    </div>
  );
};

const LaptopWelcome = () => {
  return (
    <div className="bg-black text-white">
      <Header />
      <div className="relative overflow-hidden mb-7">
        <div className="w-full h-80 flex items-center justify-between">
          <div className="absolute inset-0 bg-gradient-to-r from-[#e6d1b5] to-transparent z-0"></div>
          <div className="flex flex-col justify-center px-8 w-full z-10">
            <h1 className="text-5xl font-bold mb-4 text-[#2c2c2c]">Laptops</h1>
            <h2 className="text-xl font-semibold text-[#2c2c2c]">Laptops That Bring Out the Best In You</h2>
          </div>
          <div className="w-1/2 h-full flex items-center justify-end relative">
            <img src="/images/laptopWelcome.png" alt="laptop" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
      <main className="max-w-6xl mx-auto p-6">

        <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Choose Your OS</h2>
          <div className="flex h-55 rounded-lg overflow-hidden">
            <OSSection os="MacOS" image="/images/mac.png" />
            <OSSection os="Windows" image="/images/windows.png" />
            <OSSection os="ChromeOS" image="/images/chrome.png" />
          </div>
        </section>

        <section className="mb-10">
           <h2 className="text-2xl font-bold mb-4">Pick Your Laptop Brand</h2>
          <div className="grid grid-cols-2 h-55 md:grid-cols-4 gap-4">
            <BrandSection brand="Apple" image="/images/apple-logo.webp" />
            <BrandSection brand="HP" image="/images/asus-logo.png" />
            <BrandSection brand="Lenovo" image="/images/lenovo-logo.png" />
            <BrandSection brand="Dell" image="/images/dell-xps13.jpeg" />
          </div>
        </section>

        <ProcessorSection />
        
      </main>
    </div>

  );
};

export default LaptopWelcome;
