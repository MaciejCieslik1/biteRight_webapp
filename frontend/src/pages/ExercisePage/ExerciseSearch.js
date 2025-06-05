import React from "react";
import useExerciseSearch from "../../hooks/useExerciseSearch";

const ExerciseSearch = () => {
  const { query, setQuery, results, loading, error } = useExerciseSearch();

  return (
    <div className="exercise-search-container">
      <h2>Search for Exercise</h2>
      <div className="exercise-search-input-group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter exercise name"
        />
        {loading && <span className="loading-indicator">Searching...</span>}
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="exercise-results">
        {results.length > 0
          ? results.map((exercise, index) => (
              <div key={index} className="exercise-card">
                <h3>{exercise.name}</h3>
                <p>Calories burned: {exercise.caloriesBurnedPerHour} kcal/h</p>
                <p>Category: {exercise.category}</p>
                <p>Intensity: {exercise.intensity}</p>
              </div>
            ))
          : !loading && query.length >= 2 && <p>No results</p>}
      </div>
    </div>
  );
};

export default ExerciseSearch;
