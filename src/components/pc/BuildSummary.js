import React from 'react';

const BuildSummary = ({ selectedComponents }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Your Build</h2>
      <div className="space-y-4">
        {Object.entries(selectedComponents).map(([component, selection]) => (
          <div key={component} className="flex justify-between items-center border-b pb-2">
            <span className="font-medium text-gray-700">{component}</span>
            <span className="text-gray-900">{selection}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuildSummary;