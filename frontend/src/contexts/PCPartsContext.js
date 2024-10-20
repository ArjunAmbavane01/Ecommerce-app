import React, { createContext, useContext, useState } from 'react';

const PCPartsContext = createContext();

export const PCPartsProvider = ({ children }) => {
  const [platform, setPlatform] = useState('intel');
  const [selectedComponents, setSelectedComponents] = useState({});

  return (
    <PCPartsContext.Provider value={{ platform, setPlatform, selectedComponents, setSelectedComponents }}>
      {children}
    </PCPartsContext.Provider>
  );
};

export const usePCParts = () => {
  const context = useContext(PCPartsContext);
  if (!context) {
    throw new Error('usePCParts must be used within a PCPartsProvider');
  }
  return context;
};