import React, { useState, useEffect } from 'react';
import { usePCParts } from '../../contexts/PCPartsContext';
import ComponentModal from './ComponentModal';
import axios from 'axios';

const ComponentSelector = () => {
  const { platform, selectedComponents, setSelectedComponents } = usePCParts();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(null);
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/pc/pcparts');
        const fetchedComponents = response.data;
        
        const groupedComponents = fetchedComponents.reduce((acc, component) => {
          if (!acc[component.type]) {
            acc[component.type] = {
              name: component.type,
              options: []
            };
          }
          acc[component.type].options.push({
            name: component.name,
            price: component.price,
            platform: component.platform
          });
          return acc;
        }, {});

        setComponents(Object.values(groupedComponents));
      } catch (error) {
        console.error('Failed to fetch components:', error);
      }
    };

    fetchComponents();
  }, []);

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