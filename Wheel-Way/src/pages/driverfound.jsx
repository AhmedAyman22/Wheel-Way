// FoundDriverProvider.js
import React, { useState, createContext } from 'react';

export const FoundDriverContext = createContext();

export const FoundDriverProvider = ({ children }) => {
  const [foundDriver, setFoundDriver] = useState(false); // Initial state: false

  const setDriverFound = ({}) => {
    setFoundDriver(true); // Use setter function to update state
  };

  return (
    <FoundDriverContext.Provider value={{ foundDriver, setDriverFound }}>
      {children}
    </FoundDriverContext.Provider>
  );
};
