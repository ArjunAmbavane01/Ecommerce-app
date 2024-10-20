import React, { useState } from 'react';
import { usePCParts } from '../../contexts/PCPartsContext';
import ComponentModal from './ComponentModal';

const components = [
  { 
    name: 'CPU', 
    options: [
      { name: 'Intel Core i5-12600K', price: 299, platform: 'intel' },
      { name: 'Intel Core i7-12700K', price: 399, platform: 'intel' },
      { name: 'Intel Core i9-12900K', price: 599, platform: 'intel' },
      { name: 'AMD Ryzen 5 5600X', price: 299, platform: 'amd' },
      { name: 'AMD Ryzen 7 5800X', price: 449, platform: 'amd' },
    ]
  },
  { 
    name: 'Motherboard', 
    options: [
      { name: 'ASUS ROG Strix Z690-E Gaming', price: 469, platform: 'intel' },
      { name: 'MSI MPG Z690 Carbon WiFi', price: 399, platform: 'intel' },
      { name: 'Gigabyte Z690 AORUS Elite AX', price: 289, platform: 'intel' },
      { name: 'ASUS ROG Strix B550-F Gaming', price: 189, platform: 'amd' },
      { name: 'MSI MPG B550 Gaming Edge WiFi', price: 199, platform: 'amd' },
    ]
  },
  { 
    name: 'RAM', 
    options: [
      { name: 'Corsair Vengeance LPX 16GB', price: 89, platform: 'both' },
      { name: 'G.Skill Ripjaws V 32GB', price: 129, platform: 'both' },
      { name: 'Crucial Ballistix 16GB', price: 79, platform: 'both' },
      { name: 'TeamGroup T-Force Delta RGB 32GB', price: 149, platform: 'both' },
      { name: 'Kingston FURY Beast 64GB', price: 299, platform: 'both' },
    ]
  },
  { 
    name: 'GPU', 
    options: [
      { name: 'NVIDIA GeForce RTX 3060 Ti', price: 399, platform: 'both' },
      { name: 'AMD Radeon RX 6700 XT', price: 479, platform: 'both' },
      { name: 'NVIDIA GeForce RTX 3070', price: 499, platform: 'both' },
      { name: 'AMD Radeon RX 6800', price: 579, platform: 'both' },
      { name: 'NVIDIA GeForce RTX 3080', price: 699, platform: 'both' },
    ]
  },
  { 
    name: 'Storage', 
    options: [
      { name: 'Samsung 970 EVO Plus 1TB', price: 129, platform: 'both' },
      { name: 'Western Digital Black SN750 1TB', price: 119, platform: 'both' },
      { name: 'Crucial P5 1TB', price: 109, platform: 'both' },
      { name: 'Sabrent Rocket 4 Plus 1TB', price: 169, platform: 'both' },
      { name: 'Corsair MP600 Pro 1TB', price: 189, platform: 'both' },
    ]
  },
  { 
    name: 'Power Supply', 
    options: [
      { name: 'Corsair RM750x', price: 129, platform: 'both' },
      { name: 'EVGA SuperNOVA 650 G5', price: 99, platform: 'both' },
      { name: 'Seasonic Focus GX-650', price: 109, platform: 'both' },
      { name: 'be quiet! Straight Power 11 750W', price: 139, platform: 'both' },
      { name: 'Thermaltake Toughpower GF1 850W', price: 159, platform: 'both' },
    ]
  },
  { 
    name: 'Case', 
    options: [
      { name: 'NZXT H510', price: 69, platform: 'both' },
      { name: 'Fractal Design Meshify C', price: 89, platform: 'both' },
      { name: 'Phanteks Eclipse P300A', price: 59, platform: 'both' },
      { name: 'Lian Li LANCOOL II Mesh', price: 99, platform: 'both' },
      { name: 'Corsair 4000D Airflow', price: 79, platform: 'both' },
    ]
  },
];

const ComponentSelector = () => {
  const { platform, selectedComponents, setSelectedComponents } = usePCParts();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(null);

  const openModal = (component) => {
    setCurrentComponent(component);
    setModalOpen(true);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-white">Select Components</h2>
      <div className="grid grid-cols-2 gap-4">
        {components.map(({ name }, index) => (
          <button
            key={`${name}-${index}`}
            className="flex items-center justify-between px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg"
            onClick={() => openModal(name)}
          >
            <span className="flex items-center">
              <span className="font-medium">{name}</span>
            </span>
            <span className="text-gray-500">
              {selectedComponents[name] ? selectedComponents[name].name : 'Not selected'}
            </span>
          </button>
        ))}
      </div>
      {modalOpen && (
        <ComponentModal
          component={currentComponent}
          options={components.find(c => c.name === currentComponent).options.filter(option => option.platform === platform || option.platform === 'both')}
          setSelectedComponents={setSelectedComponents}
          closeModal={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ComponentSelector;