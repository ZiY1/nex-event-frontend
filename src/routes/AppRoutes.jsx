import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import { AuthContext } from "../contexts/AuthContext";
import EventDashboard from "../pages/EventDashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";

const AppRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route
        path="/login"
        element={!isAuthenticated ? <Login /> : <Navigate to="/events" />}
      />
      <Route
        path="/register"
        element={!isAuthenticated ? <Register /> : <Navigate to="/events" />}
      />
      <Route
        path="/events"
        element={
          <ProtectedRoute>
            <EventDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
