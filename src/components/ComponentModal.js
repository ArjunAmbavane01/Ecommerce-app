import React from 'react';

const ComponentModal = ({ component, platform, setSelectedComponents, closeModal }) => {
  // This is a mock-up. You'd need to implement actual component options based on the platform and component type.
  const options = ['Option 1', 'Option 2', 'Option 3'];

  const selectOption = (option) => {
    setSelectedComponents((prev) => ({ ...prev, [component]: option }));
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-1/2">
        <h3 className="text-xl font-semibold mb-4">Select {component}</h3>
        <div className="space-y-2">
          {options.map((option) => (
            <button
              key={option}
              className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
              onClick={() => selectOption(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ComponentModal;