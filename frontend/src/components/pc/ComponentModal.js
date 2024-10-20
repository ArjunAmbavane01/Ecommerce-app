import React from 'react';
import { usePCParts } from '../../contexts/PCPartsContext';

const ComponentModal = ({ component, options, closeModal }) => {
  const { selectedComponents, setSelectedComponents } = usePCParts();

  const handleSelect = (option) => {
    setSelectedComponents(prev => ({
      ...prev,
      [component]: option
    }));
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">Select {component}</h2>
        <div className="space-y-4">
          {options.map((option, index) => (
            <button
              key={`${option.name}-${index}`}
              className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex justify-between items-center"
              onClick={() => handleSelect(option)}
            >
              <span>{option.name}</span>
              <span className="text-sm text-gray-500">${option.price}</span>
            </button>
          ))}
        </div>
        <button
          className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ComponentModal;