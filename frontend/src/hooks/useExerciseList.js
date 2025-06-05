import { useState, useEffect } from "react";
import { fetchExercisesByDate } from "../api/apiExercise";

export function useExerciseList(dateStr, refreshTrigger) {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

    loadExercises();
  }, [dateStr, refreshTrigger]);

  return { exercises, loading, error };
}
