import React from 'react';
import PCCustomizer from '../components/PCCustomizer';
import Header from '../components/Header';

const CustomizePC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className=" text-white bg-white shadow-md p-4">
        <Header />
      </header>
      <main className="max-w-8xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Customize Your PC</h1>
        <PCCustomizer />
      </main>
    </div>
  );
};

export default CustomizePC;