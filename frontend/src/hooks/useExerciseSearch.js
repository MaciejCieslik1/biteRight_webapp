import { useState, useEffect } from "react";
import { fetchExerciseInfoByName } from "../api/apiExercise";

const useExerciseSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchExercises = async (name) => {
    if (!name || !name.trim()) {
      console.warn("[useExerciseSearch] Empty query provided");
      setResults([]);
      return;
    }

    console.log(`[useExerciseSearch] Searching exercises with name: "${name}"`);
    setLoading(true);
    setError(null);

    try {
      const data = await fetchExerciseInfoByName(name);
      console.debug("[useExerciseSearch] Results:", data);
      setResults(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(
        "[useExerciseSearch] Error fetching exercises:",
        err.message
      );
      setError(err.message || "Failed to fetch exercises");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.length >= 2) {
      searchExercises(query);
    } else {
      setResults([]);
    }
  }, [query]);

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    searchExercises,
  };
};

export default useExerciseSearch;
