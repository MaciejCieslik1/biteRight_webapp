import React, { useState } from "react";
import useExerciseSearch from "../../hooks/useExerciseSearch";
import UserExerciseForm from "./UserExerciseForm";
import "./styles/ExerciseSearch.css";

const ExerciseSearch = ({ dateStr, onSuccess }) => {
  const { query, setQuery, results, loading, error } = useExerciseSearch();
  const [selectedExercise, setSelectedExercise] = useState(null);

  const handleSelect = (exercise) => {
    console.debug("Selected exercise:", exercise.exerciseId);
    setSelectedExercise(exercise);
  };

  const handleSuccess = () => {
    setSelectedExercise(null);
    if (onSuccess) onSuccess();
  };

  return (
    <div className="exercise-search">
      <label htmlFor="exerciseSearch">Add exercise:</label>
      <input
        id="exerciseSearch"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="Type exercise name..."
        autoComplete="off"
      />

      {loading && <p>Loading exercises...</p>}
      {error && <p className="error">{error}</p>}

      {results.length > 0 && (
        <ul className="exercise-results-list">
          {results.map((exercise) => (
            <li
              key={exercise.exerciseId}
              onClick={() => handleSelect(exercise)}
              className={
                selectedExercise?.exerciseId === exercise.exerciseId
                  ? "selected"
                  : ""
              }
            >
              {exercise.name}
            </li>
          ))}
        </ul>
      )}

      {!loading && query.length >= 2 && results.length === 0 && (
        <p>No results found.</p>
      )}

      {selectedExercise && (
        <div className="user-exercise-form-wrapper">
          <UserExerciseForm
            exerciseId={selectedExercise.exerciseId}
            onSuccess={handleSuccess}
            dateStr={dateStr}
          />
        </div>
      )}
    </div>
  );
};

export default ExerciseSearch;
