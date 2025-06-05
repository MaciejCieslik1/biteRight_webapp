import React from "react";
import { useUserExerciseForm } from "../../hooks/useUserExerciseForm";
import "./styles/UserExerciseForm.css";

const UserExerciseForm = ({ onSuccess, dateStr }) => {
  const {
    exerciseInfoId,
    setExerciseInfoId,
    duration,
    setDuration,
    error,
    successMsg,
    handleSubmit,
  } = useUserExerciseForm(dateStr, onSuccess);

  return (
    <form className="user-exercise-form" onSubmit={handleSubmit}>
      <h2>Dodaj Ćwiczenie</h2>

      <label>ID ćwiczenia:</label>
      <input
        type="number"
        value={exerciseInfoId}
        onChange={(e) => setExerciseInfoId(e.target.value)}
        required
      />

      <label>Czas trwania (minuty):</label>
      <input
        type="number"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        required
      />

      <button type="submit">Zapisz ćwiczenie</button>

      {error && <p className="error">{error}</p>}
      {successMsg && <p className="success">{successMsg}</p>}
    </form>
  );
};

export default UserExerciseForm;
