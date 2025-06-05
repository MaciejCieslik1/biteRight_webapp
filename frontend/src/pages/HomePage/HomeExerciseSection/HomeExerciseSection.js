import React, { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useHomeExercises } from "../../../hooks/useHomeExercises";

const ExerciseSection = ({ selectedDate }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const dateStr = dayjs(selectedDate).format("YYYY-MM-DD");

  const { exercises, loading, error } = useHomeExercises(user, dateStr);

  const goToExercisePage = () => {
    navigate("/exercises", { state: { dateStr } });
  };

  return (
    <section>
      <h1>Twoje ćwiczenia</h1>

      {loading && <p>Ładowanie ćwiczeń...</p>}
      {error && <p className="error">Błąd: {error}</p>}

      {!loading && !error && (
        <>
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
        </>
      )}

      <button onClick={goToExercisePage}>Go to Exercise Page</button>
    </section>
  );
};

export default ExerciseSection;
