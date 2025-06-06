import React, { useEffect } from "react";
import { useUserExerciseForm } from "../../hooks/useUserExerciseForm";
import "./styles/UserExerciseForm.css";

const UserExerciseForm = ({
  exerciseId: initialExerciseId,
  onSuccess,
  dateStr,
}) => {
  const {
    exerciseId,
    setExerciseId,
    duration,
    setDuration,
    error,
    successMsg,
    handleSubmit,
  } = useUserExerciseForm(dateStr, onSuccess);

  useEffect(() => {
    if (initialExerciseId) {
      setExerciseId(initialExerciseId);
    }
  }, [initialExerciseId, setExerciseId]);

  return (
    <div className="user-exercise-form-wrapper">
      <form className="selected-exercise-form" onSubmit={handleSubmit}>
        <div className="selected-exercise-header">
          Adding: <strong>{"name"}</strong>
        </div>

        <input
          type="number"
          placeholder="Duration (min)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          min="0"
        />

        <button type="submit" className="add-exercise-btn">
          Add
        </button>

        {error && <p className="status-msg error">{error}</p>}
        {successMsg && <p className="status-msg success">{successMsg}</p>}
      </form>
    </div>
  );
};

export default UserExerciseForm;
