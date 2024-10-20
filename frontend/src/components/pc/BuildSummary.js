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
    { name: 'PLATFORM', icon: '⚙️' },
    { name: 'CPU', icon: '🔲' },
    { name: 'GPU', icon: '🖥️' },
    { name: 'CASE', icon: '📦' },
    { name: 'MOTHERBOARD', icon: '🔌' },
    { name: 'CPU COOLER', icon: '❄️' },
    { name: 'SMPS', icon: '🔋' },
    { name: 'RAM', icon: '🧠' },
    { name: 'STORAGE 1', icon: '💽' },
    { name: 'STORAGE 2', icon: '💾' },
  ];

  return (
    <div className="bg-[#f5f7e5] flex flex-col items-center justify-center p-4">
      <div className="w-full">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-3 gap-8">
            {componentTypes.map((component, index) => {
              const selectedComponent = selectedComponents[component.name] || { name: 'Select', price: 0 };
              return (
                <div key={index} className="flex justify-between items-center border-b pb-2">
                  <div className="flex items-center">
                    <span className="mr-2 text-2xl">{component.icon}</span>
                    <span className="font-medium text-gray-700">{component.name}</span>
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
          <div className="mt-6 flex justify-between items-center font-bold">
            <span>Total Price:</span>
            <span>${totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildSummary;