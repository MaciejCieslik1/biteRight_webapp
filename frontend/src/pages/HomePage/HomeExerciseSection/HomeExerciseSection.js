import React, { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useHomeExercises } from "../../../hooks/useHomeExercises";
import "../styles/HomeExerciseSection.css";

const ExerciseSection = ({ selectedDate }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const dateStr = dayjs(selectedDate).format("YYYY-MM-DD");

  const { exercises, loading, error } = useHomeExercises(user, dateStr);

  const goToExercisePage = () => {
    navigate("/exercises", { state: { dateStr } });
  };

  return (
    <div className="home-exercise-section">
      <div className="exercise-section-title">Exercise</div>

      {!loading && !error && (
        <>
          {exercises.length === 0 ? (
            <div className="exercise-section-text"> No exercises added yet</div>
          ) : (
            <div className="exercise-section-content">
              <div className="exercise-section-items">
                {exercises.map((ex) => (
                  <div
                    className="exercise-section-item"
                    key={ex.userExerciseId}
                  >
                    <div className="exercise-section-item-name">
                      <strong>{ex.activityName}</strong>
                    </div>
                    <div className="exercise-section-item-description">
                      <strong>duration:</strong> {ex.duration} min
                    </div>
                    <div className="exercise-section-item-description">
                      <strong>calories burnt:</strong> {ex.caloriesBurnt}
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="exercise-section-button"
                onClick={goToExercisePage}
              >
                {" "}
                +{" "}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ExerciseSection;
