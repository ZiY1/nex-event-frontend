import React, { createContext, useState, useEffect } from "react";

import {
  login as loginService,
  logout as logoutService
} from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const login = async (credentials) => {
    const result = await loginService(credentials);
    if (result.success) {
      setIsAuthenticated(true);
    }
    return result;
  };

  const logout = () => {
    logoutService();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
