import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ExerciseInfoForm from "./ExerciseInfoForm";
import ExerciseList from "./ExerciseList";
import UserExerciseForm from "./UserExerciseForm";
import ExerciseSearch from "./ExerciseSearch";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import "./styles/ExercisePage.css";

const ExercisePage = () => {
  const location = useLocation();
  const dateStr = location.state?.dateStr || "";
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="exercise-page">
      <Navbar showButtons={false} showLogoutButton={true} />
      <div className="exercise-page-container">
        <div className="exercise-page-left">
          <ExerciseSearch dateStr={dateStr} onSuccess={handleRefresh} />
        </div>

        <div className="exercise-page-middle">
          <ExerciseList dateStr={dateStr} refreshTrigger={refreshKey} />
        </div>

        <div className="exercise-page-right">
          <ExerciseInfoForm onSuccess={handleRefresh} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ExercisePage;
