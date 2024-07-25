// AuthProvider.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('userName');
    if (name) {
      setIsAuthenticated(true);
      setUserName(name);
    }
  }, []);

  const login = (name) => {
    setIsAuthenticated(true);
    setUserName(name);
    localStorage.setItem('userName', name);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserName('');
    localStorage.removeItem('userName');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
