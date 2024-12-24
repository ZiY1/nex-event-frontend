import React, { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { setupInterceptors } from "../services/api";
import {
  login as loginService,
  logout as logoutService
} from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children, setNotification }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = async (credentials) => {
    const result = await loginService(credentials);
    if (result.success) {
      setIsAuthenticated(true);
      navigate("/events");
    }
    return result;
  };

  const logout = useCallback(async () => {
    await logoutService();
    setIsAuthenticated(false);
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    setupInterceptors(logout, setNotification);
  }, [logout, setNotification]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
