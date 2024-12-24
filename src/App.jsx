import React, { useState } from "react";
import { HashRouter } from "react-router-dom";

import Notification from "./components/Notification";
import { AuthProvider } from "./contexts/AuthContext";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  const [notification, setNotification] = useState("");

  const handleNotificationClose = () => {
    setNotification("");
  };

  return (
    <HashRouter>
      <AuthProvider setNotification={setNotification}>
        <AppRoutes />
        <Notification
          message={notification}
          onClose={handleNotificationClose}
        />
      </AuthProvider>
    </HashRouter>
  );
};

export default App;
