import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import HomePage from "../pages/HomePage/HomePage";
import VerificationPage from "../pages/VerificationPage/VerificationPage";
import ForgottenPasswordPage from "../pages/ForgottenPasswordPage/ForgottenPasswordPage";
import PasswordResetPage from "../pages/PasswordResetPage/PasswordResetPage";
import MealPage from "../pages/MealPage/MealPage";
import SettingsPage from "../pages/SettingsPage/SettingsPage";
import ProgressPage from "../pages/ProgressPage/ProgressPage";
import RecipeListPage from "../pages/RecipesPage/RecipeListPage";
import RecipeFormPage from "../pages/RecipesPage/RecipeFormPage";
import RecipeViewModal from "../pages/RecipesPage/RecipeViewModal";

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
      <Route path="/passwordreset/:email/:code" element={<PasswordResetPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/progress" element={<ProgressPage />} />
      <Route path="/recipes" element={<RecipeListPage />} />
      <Route path="/recipes/create" element={<RecipeFormPage />} />
      <Route path="/recipes/view/:id" element={<RecipeViewModal />} />
      <Route path="/recipes/edit/:id" element={<RecipeFormPage />} />


    </Routes>
  );
};

export default AppRoutes;
