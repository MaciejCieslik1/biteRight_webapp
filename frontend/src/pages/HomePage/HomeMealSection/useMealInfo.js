import { useState, useEffect } from "react";
import { fetchMealInfo } from "./fetchMealInfo";
import "./HomeMealSection.css";

const useMealInfo = (mealId) => {
  const [mealInfo, setMealInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mealId) return;

    const loadMealInfo = async () => {
      try {
        const data = await fetchMealInfo(mealId);
        setMealInfo(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setMealInfo(null);
      }
    };

    loadMealInfo();
  }, [mealId]);

  return { mealInfo, error };
};

export default useMealInfo;
