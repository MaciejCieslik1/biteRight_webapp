import React from "react";
import { useExerciseList } from "../../hooks/useExerciseList";
import "./styles/ExerciseList.css";

const ExerciseList = ({ dateStr, refreshTrigger }) => {
  const { exercises, loading, error } = useExerciseList(
    dateStr,
    refreshTrigger
  );

  return (
    <div className="exercise-list-container">
      <h2>Ćwiczenia z dnia: {dateStr}</h2>
      {loading && <p>Ładowanie ćwiczeń...</p>}
      {error && <p className="error">{error}</p>}
      {exercises.length === 0 && !loading && !error && <p>Brak ćwiczeń.</p>}
      <ul>
        {exercises.map((exercise, index) => (
          <li key={exercise.id || index}>
            <strong>name</strong> - {exercise.duration} min -{" "}
            {exercise.caloriesBurnt} kcal
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseList;
