import React from 'react';
import { usePCParts } from '../../contexts/PCPartsContext';
import { Trash2 } from 'lucide-react';

const BuildSummary = () => {
  const { selectedComponents, setSelectedComponents } = usePCParts();

  const removeComponent = (componentName) => {
    setSelectedComponents(prev => {
      const newComponents = { ...prev };
      delete newComponents[componentName];
      return newComponents;
    });
  };

  const totalPrice = Object.values(selectedComponents).reduce((sum, component) => sum + (component?.price || 0), 0);

  const componentTypes = [
    { name: 'CPU', url: '/images/CPU.svg' },
    { name: 'GPU', url: '/images/GPU.svg' },
    { name: 'Case', url: '/images/Case.svg' },
    { name: 'Motherboard', url: '/images/Motherboard.svg' },
    { name: 'Power Supply', url: '/images/SMPS.svg' },
    { name: 'RAM', url: '/images/RAM.svg' },
    { name: 'Storage', url: '/images/Storage.svg' },
  ];

  return (
    <div className="bg-[#f5f7e5] flex flex-col items-center justify-center py-4 px-6">
      <div className="w-full mx-2">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-3 gap-8">
            {componentTypes.map((component, index) => {
              let selectedComponent;
              selectedComponent = selectedComponents[component.name] || { name: 'Select', price: 0 };
              return (
                <div key={index} className="flex justify-between items-center border-b pb-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 mr-3">
                      <img src={component.url} />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-900 mr-2">{selectedComponent.name}</span>
                    {selectedComponent.name !== 'Select' && (
                      <>
                        <span className="text-sm text-gray-500 mr-2">${selectedComponent.price}</span>
                        <button
                          onClick={() => removeComponent(component.name)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-9 flex justify-between items-center font-bold">
            <span>Total Price:</span>
            <span>${totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildSummary;