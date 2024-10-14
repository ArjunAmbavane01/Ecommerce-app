import React, { useState } from 'react';
import ComponentModal from './ComponentModal';

const components = [
  { name: 'CPU', icon: '🧠' },
  { name: 'Motherboard', icon: '🖥️' },
  { name: 'RAM', icon: '🧮' },
  { name: 'GPU', icon: '🎮' },
  { name: 'Storage', icon: '💾' },
  { name: 'Power Supply', icon: '🔌' },
  { name: 'Case', icon: '🏠' },
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
        {components.map(({ name, icon }) => (
          <button
            key={name}
            className="flex items-center justify-between px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg"
            onClick={() => openModal(name)}
          >
            <span className="flex items-center">
              <span className="text-2xl mr-2">{icon}</span>
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