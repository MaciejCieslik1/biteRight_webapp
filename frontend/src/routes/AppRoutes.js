import React from "react";
import { Routes, Route } from "react-router-dom";
import TestPage from "../pages/landing_page/test";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TestPage />} />
    </Routes>
  );
};

export default AppRoutes;
