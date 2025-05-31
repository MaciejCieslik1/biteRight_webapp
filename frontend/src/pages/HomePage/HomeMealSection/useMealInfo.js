import { useState, useEffect } from "react";
import "./HomeMealSection.css";

const useMealInfo = (mealId) => {
  const [mealInfo, setMealInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mealId) return;

    const fetchMealInfoById = async (id) => {
      const token = localStorage.getItem("jwt");
      if (!token) {
        setError("No JWT token found");
        return;
      }

      try {
        const res = await fetch(`http://localhost:8080/mealInfo/find/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`Failed to fetch meal info: ${errText}`);
        }

        const data = await res.json();
        setMealInfo(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMealInfoById(mealId);
  }, [mealId]);

  return { mealInfo, error };
};

export default useMealInfo;
