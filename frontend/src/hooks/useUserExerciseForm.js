import { useState } from "react";
import { createUserExercise } from "../api/apiExercise";

export function useUserExerciseForm(dateStr, onSuccess) {
  const [exerciseInfoId, setExerciseInfoId] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const isoDateTime = `${dateStr}T00:00:00`;
    const data = {
      exerciseInfoId: parseInt(exerciseInfoId),
      activityDate: isoDateTime,
      duration: parseInt(duration),
    };

    try {
      const response = await createUserExercise(data);
      setSuccessMsg("Ćwiczenie zostało dodane!");
      setExerciseInfoId("");
      setDuration("");
      if (onSuccess) onSuccess(response);
    } catch (err) {
      setError(err.message || "Wystąpił błąd.");
    }
  };

  return {
    exerciseInfoId,
    setExerciseInfoId,
    duration,
    setDuration,
    error,
    successMsg,
    handleSubmit,
  };
}
