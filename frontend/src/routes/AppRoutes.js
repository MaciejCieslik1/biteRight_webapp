import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import HomePage from "../pages/HomePage/HomePage";
import VerificationPage from "../pages/VerificationPage/VerificationPage";
import ForgottenPasswordPage from "../pages/ForgottenPasswordPage/ForgottenPasswordPage";
import MealPage from "../pages/MealPage/MealPage";
import SettingsPage from "../pages/SettingsPage/SettingsPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/meal" element={<MealPage />} />
      <Route path="/verifyuser/:email/:code" element={<VerificationPage />} />
      <Route path="/forgottenpasswordform" element={<ForgottenPasswordPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
};

export default AppRoutes;
