import React, { useState } from 'react';
import ComponentModal from './ComponentModal';

const components = [
  { name: 'CPU'},
  { name: 'Motherboard'},
  { name: 'RAM'},
  { name: 'GPU'},
  { name: 'Storage'},
  { name: 'Power Supply'},
  { name: 'Case'},
];

const ComponentSelector = ({ platform, selectedComponents, setSelectedComponents }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(null);

  const openModal = (component) => {
    setCurrentComponent(component);
    setModalOpen(true);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Select Components</h2>
      <div className="grid grid-cols-2 gap-4">
        {components.map(({ name }) => (
          <button
            key={name}
            className="flex items-center justify-between px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg"
            onClick={() => openModal(name)}
          >
            <span className="flex items-center">
              <span className="font-medium">{name}</span>
            </span>
            <span className="text-gray-500">
              {selectedComponents[name] || 'Not selected'}
            </span>
          </button>
        ))}
      </div>
      {modalOpen && (
        <ComponentModal
          component={currentComponent}
          platform={platform}
          setSelectedComponents={setSelectedComponents}
          closeModal={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ComponentSelector;