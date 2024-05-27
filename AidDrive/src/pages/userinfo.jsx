// src/contexts/UserContext.js
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null); // Adding userId state

  return (
    <UserContext.Provider value={{ user, setUser, userId, setUserId }}> {/* Providing userId and setUserId */}
      {children}
    </UserContext.Provider>
  );
};
