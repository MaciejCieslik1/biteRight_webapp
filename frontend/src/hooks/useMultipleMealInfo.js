import { useState, useEffect } from "react";
import { fetchMealInfo } from "../api/apiMealInfo";

const useMultipleMealInfo = (mealIds = []) => {
  const [mealInfos, setMealInfos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mealIds.length) return;

    const fetchAll = async () => {
      try {
        const results = await Promise.all(
          mealIds.map((id) => fetchMealInfo(id))
        );
        setMealInfos(results);
        setError(null);
      } catch (err) {
        setError(err.message);
        setMealInfos([]);
      }
    };

    fetchAll();
  }, [mealIds]);

  return { mealInfos, error };
};

export default useMultipleMealInfo;
