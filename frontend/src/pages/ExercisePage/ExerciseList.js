import React from "react";
import { FaTrash } from "react-icons/fa";
import { useExerciseList } from "../../hooks/useExerciseList";
import "./styles/ExerciseList.css";

const ExerciseList = ({ dateStr, refreshTrigger }) => {
  const { exercises, loading, error, deleteExercise } = useExerciseList(
    dateStr,
    refreshTrigger
  );

  if (loading) return <p>Loading exercises...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!exercises.length) return <p>No exercises added yet.</p>;

  console.log("[ExerciseList] Rendering exercises:", exercises);

  return (
    <div className="exercise-list">
      <div className="exercise-list-title">Exercises:</div>
      <ul>
        {exercises.map((exercise, idx) => (
          <li key={exercise.id || idx} className="exercise-list-item">
            <strong>{exercise.activityName}</strong>{" "}
            {exercise.duration ? `– ${exercise.duration} min` : ""}{" "}
            {exercise.caloriesBurnt ? `– ${exercise.caloriesBurnt} kcal` : ""}
            <button
              className="exercise-delete-btn"
              onClick={() => deleteExercise(exercise.id)}
              title="Delete exercise"
            >
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseList;
