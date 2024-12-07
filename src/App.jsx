import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';

const App = () => (
  <AuthProvider>
    <AppRoutes />
  </AuthProvider>
);

export default App;