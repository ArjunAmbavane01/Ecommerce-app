import React from 'react';
import PlatformSelector from './PlatformSelector';
import ComponentSelector from './ComponentSelector';
import BuildSummary from './BuildSummary';
import { usePCParts } from '../../contexts/PCPartsContext';

const PCCustomizer = () => {
  return (
    <div className="bg-[#f7f48a] min-h-screen p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-4">BUILD A PC</h1>
        <p className="mb-8 text-gray-700">
          Build your dream PC at the best price possible with the MVP configurator, our custom PC builder. Choose every part of your computer, experiment with different configurations and budgets, and download an instant quote. Assemble your perfect desktop PC in just a few clicks and get a tailored basic, gaming, or professional rig.
        </p>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex">
            <div className="w-1/2 bg-white flex items-center justify-center p-8">
              <img
                src="/images/pc-build-removebg-preview.png"
                alt="Custom PC Build"
                className="max-w-full max-h-[400px] object-contain scale-150"
                style={{transform: "scale(2.1)"}}
              />
            </div>
            <div className="w-1/2 bg-gradient-to-b from-red-600 to-purple-800 p-8">
              <div className="bg-yellow-400 text-black font-semibold py-2 px-4 mb-4 inline-block">
                PLATFORM
              </div>
              <PlatformSelector />
              <ComponentSelector />
            </div>
          </div>
        </div>
        <div className="mt-8">
        <h1 className="text-4xl font-bold mb-6 text-[#2c3e50]">YOUR BUILD</h1>
          <BuildSummary />
        </div>
        <AddToCartButton />
      </div>
    </div>
  );
};

const AddToCartButton = () => {
  const { selectedComponents } = usePCParts();

  const handleAddToCart = () => {
    // Here you would typically send the selectedComponents to your cart system
    console.log("Adding to cart:", selectedComponents);
    // You can implement your cart logic here
  };

  return (
    <button
      className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleAddToCart}
    >
      Add to Cart
    </button>
  );
};

export default PCCustomizer;