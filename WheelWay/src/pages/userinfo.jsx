// src/contexts/UserContext.js
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userid, setUserId] = useState(null); // Adding userId state

  return (
    <UserContext.Provider value={{ user, setUser, userid, setUserId }}> {/* Providing userId and setUserId */}
      {children}
    </UserContext.Provider>
  );
};
