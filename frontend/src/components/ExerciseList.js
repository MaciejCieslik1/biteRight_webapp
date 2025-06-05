import React from "react";
import { useHomeExercises } from "../hooks/useHomeExercises";

function ExerciseList({ user, dateStr }) {
  const { exercises, loading, error } = useHomeExercises(user, dateStr);

  if (loading) return <p>Ładowanie ćwiczeń...</p>;
  if (error) return <p>Błąd: {error}</p>;

  return (
    <div>
      <h2>Ćwiczenia z dnia: {dateStr}</h2>
      {exercises.length === 0 ? (
        <p>Brak ćwiczeń dla wybranego dnia.</p>
      ) : (
        <ul>
          {exercises.map((ex) => (
            <li key={ex.userExerciseId}>
              <strong>ID ćwiczenia:</strong> {ex.exerciseId} |{" "}
              <strong>Data:</strong> {ex.activityDate} |{" "}
              <strong>Czas trwania:</strong> {ex.duration} min |{" "}
              <strong>Kalorie:</strong> {ex.caloriesBurnt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExerciseList;
