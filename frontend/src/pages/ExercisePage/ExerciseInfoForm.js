import React from "react";
import { useExerciseInfoForm } from "../../hooks/useExerciseInfoForm";
import "./styles/ExerciseInfoForm.css";

const ExerciseInfoForm = () => {
  const {
    name,
    setName,
    metabolicEquivalent,
    setMetabolicEquivalent,
    loading,
    successMsg,
    errorMsg,
    handleSubmit,
  } = useExerciseInfoForm();

  const handleLocalSubmit = async () => {
    await handleSubmit();
  };

  return (
    <div className="exercise-create">
      <div className="exercise-create-header">
        <strong>Your exercise is not in the database?</strong>
      </div>
      <div className="exercise-create-header">You can create it here!</div>
      <div className="exercise-create-content">
        <div className="exercise-create-title">Create new exercise</div>

        <input
          type="text"
          placeholder="Exercise Name*"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          step="0.1"
          placeholder="Metabolic Equivalent (MET)*"
          value={metabolicEquivalent}
          onChange={(e) => setMetabolicEquivalent(e.target.value)}
          required
        />

        <button
          className="create-exercise-btn"
          type="button"
          onClick={handleLocalSubmit}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Exercise"}
        </button>

        {successMsg && <p className="success">{successMsg}</p>}
        {errorMsg && <p className="error">{errorMsg}</p>}
      </div>
    </div>
  );
};

export default ExerciseInfoForm;
