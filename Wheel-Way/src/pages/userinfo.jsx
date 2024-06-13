// userinfo.js
import React, { useState, createContext } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (userData) => {
    setUser(userData.user);
    setUserId(userData.userId);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setUserId(null);
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ user, setUser, userId, setUserId, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
