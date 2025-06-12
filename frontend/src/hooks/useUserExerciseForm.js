import { useState } from "react";
import { createUserExercise } from "../api/apiExercise";

export function useUserExerciseForm(dateStr, onSuccess) {
  const [exerciseId, setExerciseId] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // zatrzymujemy domyślne submitowanie formularza
    setError(null);
    setSuccessMsg(null);

    const isoDateTime = `${dateStr}T00:00:00`;
    const data = {
      exerciseInfoId: parseInt(exerciseId),
      activityDate: isoDateTime,
      duration: parseInt(duration),
    };

    try {
      const response = await createUserExercise(data);
      setSuccessMsg("Ćwiczenie zostało dodane!");
      setExerciseId("");
      setDuration("");
      if (onSuccess) onSuccess(response);
    } catch (err) {
      setError(err.message || "Wystąpił błąd.");
    }
  };

  return {
    exerciseId,
    setExerciseId,
    duration,
    setDuration,
    error,
    successMsg,
    handleSubmit,
  };
}
