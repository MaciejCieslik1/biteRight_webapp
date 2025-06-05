import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ExerciseInfoForm from "./ExerciseInfoForm";
import ExerciseList from "./ExerciseList";
import UserExerciseForm from "./UserExerciseForm";

const ExercisePage = () => {
  const location = useLocation();
  const dateStr = location.state?.dateStr || "";
  console.debug("[ExercisePage] dateStr:", dateStr);

  // Dodajemy trigger do przeładowania listy
  const [refreshKey, setRefreshKey] = useState(0);

  // Funkcja do wywołania po dodaniu ćwiczenia
  const handleRefresh = () => setRefreshKey((prev) => prev + 1);

  return (
    <div>
      <h1>Exercise Page</h1>
      <p>Tu pojawi się szczegółowa lista ćwiczeń lub inne informacje.</p>

      <ExerciseInfoForm onSuccess={handleRefresh} />
      <UserExerciseForm dateStr={dateStr} onSuccess={handleRefresh} />
      <ExerciseList dateStr={dateStr} refreshTrigger={refreshKey} />
    </div>
  );
};

export default ExercisePage;
