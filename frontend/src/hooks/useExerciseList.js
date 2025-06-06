import { useState, useEffect } from "react";
import { fetchExercisesByDate, deleteUserExercise } from "../api/apiExercise";

export function useExerciseList(dateStr, externalRefreshTrigger) {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token || !dateStr) return;

    const loadExercises = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchExercisesByDate(token, dateStr);
        const content = data?.content || data || [];
        setExercises(content);
      } catch (err) {
        setError(err.message || "Błąd podczas pobierania ćwiczeń.");
      } finally {
        setLoading(false);
      }
    };
    console.log(
      "Loading exercises due to refresh",
      refreshTrigger,
      externalRefreshTrigger
    );
    loadExercises();
  }, [dateStr, refreshTrigger, externalRefreshTrigger]);

  const deleteExercise = async (userExerciseId) => {
    setError(null);
    try {
      await deleteUserExercise(userExerciseId);
      // Odświeżenie listy po usunięciu:
      setRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      setError(err.message || "Błąd podczas usuwania ćwiczenia.");
    }
  };

  return { exercises, loading, error, deleteExercise };
}
