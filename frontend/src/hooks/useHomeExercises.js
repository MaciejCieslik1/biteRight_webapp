import { useEffect, useState } from "react";
import { fetchExercisesByDate } from "../api/apiExercise";

export function useHomeExercises(user, dateStr) {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.debug("[useHomeExercises] Hook called");
  console.debug("[useHomeExercises] user:", user);
  console.debug("[useHomeExercises] dateStr:", dateStr);

  useEffect(() => {
    console.debug("[useHomeExercises] useEffect triggered");

    if (!user) {
      console.warn(
        "[useHomeExercises] user is null/undefined – skipping fetch"
      );
      return;
    }

    if (!dateStr) {
      console.warn("[useHomeExercises] dateStr is missing – skipping fetch");
      return;
    }

    const loadExercises = async () => {
      const token = localStorage.getItem("jwt");
      console.debug(
        "[useHomeExercises] Retrieved token from localStorage:",
        token
      );

      if (!token) {
        console.error("[useHomeExercises] No token found – aborting fetch");
        setError("Authentication token missing.");
        return;
      }

      console.debug("[useHomeExercises] Loading exercises...");
      setLoading(true);
      setError(null);

      try {
        console.debug("[useHomeExercises] Calling fetchExercisesByDate");
        const response = await fetchExercisesByDate(token, dateStr);
        console.debug("[useHomeExercises] Raw response:", response);

        const exerciseList = response?.content || [];
        console.debug("[useHomeExercises] Exercises fetched:", exerciseList);

        setExercises(exerciseList);
      } catch (e) {
        console.error("[useHomeExercises] Error caught:", e.message);
        setError(e.message);
      } finally {
        console.debug("[useHomeExercises] Fetch completed");
        setLoading(false);
      }
    };

    loadExercises();
  }, [user, dateStr]);

  return { exercises, loading, error, dateStr };
}
