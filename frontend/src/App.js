import "./App.scss";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { UserProvider } from "./contexts/UserContext";
import { PreferencesProvider } from "./contexts/PreferencesContext";

function App() {
  return (
    <PreferencesProvider>
    <UserProvider>
      <Router>
        <AppRoutes />
      </Router>
    </UserProvider>
    </PreferencesProvider>
  );
}

export default App;
