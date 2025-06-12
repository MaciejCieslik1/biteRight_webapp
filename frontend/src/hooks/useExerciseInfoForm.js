import { useState } from "react";
import { createExerciseInfo } from "../api/apiExercise";

export function useExerciseInfoForm() {
  const [name, setName] = useState("");
  const [metabolicEquivalent, setMetabolicEquivalent] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const result = await createExerciseInfo({
        name,
        metabolicEquivalent: parseFloat(metabolicEquivalent),
      });
      setSuccessMsg(`Exercise "${result.name}" created successfully.`);
      setName("");
      setMetabolicEquivalent("");
    } catch (err) {
      setErrorMsg(err.message || "Error occured.");
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    setName,
    metabolicEquivalent,
    setMetabolicEquivalent,
    loading,
    successMsg,
    errorMsg,
    handleSubmit,
  };
}
