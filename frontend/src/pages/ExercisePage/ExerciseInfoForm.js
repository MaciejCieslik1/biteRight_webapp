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

  return (
    <div className="exercise-form-container">
      <h2>Create Exercise Info</h2>
      <form onSubmit={handleSubmit} className="exercise-form">
        <label htmlFor="name">Exercise Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="e.g. Running"
        />

        <label htmlFor="met">Metabolic Equivalent (MET)</label>
        <input
          id="met"
          type="number"
          step="0.1"
          value={metabolicEquivalent}
          onChange={(e) => setMetabolicEquivalent(e.target.value)}
          required
          placeholder="e.g. 7.5"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Create Exercise Info"}
        </button>

        {successMsg && <p className="success">{successMsg}</p>}
        {errorMsg && <p className="error">{errorMsg}</p>}
      </form>
    </div>
  );
};

export default ExerciseInfoForm;
