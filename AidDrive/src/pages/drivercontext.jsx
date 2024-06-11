// DriverContext.js
import React, { createContext, useState } from 'react';

export const DriverContext = createContext();

export const DriverProvider = ({ children }) => {
  const [findingDriver, setFindingDriver] = useState(false);

  return (
    <DriverContext.Provider value={{ findingDriver, setFindingDriver }}>
      {children}
    </DriverContext.Provider>
  );
};
