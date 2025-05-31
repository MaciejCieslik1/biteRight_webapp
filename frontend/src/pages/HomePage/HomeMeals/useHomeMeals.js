import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import dayjs from "dayjs";

const DEFAULT_MEALS = [
  { mealTypeId: 1, name: "Breakfast", description: "Default breakfast" },
  { mealTypeId: 2, name: "Lunch", description: "Default lunch" },
  { mealTypeId: 3, name: "Dinner", description: "Default dinner" },
  { mealTypeId: 5, name: "Snack", description: "Default snack" },
];

const emptyMealsState = {
  BREAKFAST: null,
  LUNCH: null,
  DINNER: null,
  SNACK: null,
};

async function fetchMealsForUser(token, dateStr) {
  const res = await fetch(`http://localhost:8080/meal/findByDate/${dateStr}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

async function createDefaultMeals(token, dateStr) {
  await Promise.all(
    DEFAULT_MEALS.map(async (meal) => {
      const body = {
        mealTypeId: meal.mealTypeId,
        name: meal.name,
        description: meal.description,
        mealDate: `${dateStr}T12:00:00`,
        contents: [],
      };

      const res = await fetch(`http://localhost:8080/meal/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        console.warn(`Failed to create ${meal.name}:`, await res.text());
      }
    })
  );
}

async function getMealsWithContents(token, mealList) {
  const mealsByType = {
    BREAKFAST: null,
    LUNCH: null,
    DINNER: null,
    SNACK: null,
  };

  for (const meal of mealList) {
    if (!meal.mealId || !meal.mealTypeName) continue;

    const res = await fetch(
      `http://localhost:8080/mealContent/findById/${meal.mealId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!res.ok) continue;

    const contents = await res.json();
    mealsByType[meal.mealTypeName] = { ...meal, contents };
  }

  return mealsByType;
}

export function useHomeMeals(selectedDate) {
  const { user } = useContext(UserContext);
  const [meals, setMeals] = useState(emptyMealsState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const parsedDate = dayjs(selectedDate);
  const dateStr = parsedDate.format("YYYY-MM-DD");

  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem("jwt");
    if (!token) return;

    const loadMeals = async () => {
      setLoading(true);
      setError(null);
      try {
        let mealList = await fetchMealsForUser(token, dateStr);
        if (mealList.length === 0) {
          await createDefaultMeals(token, dateStr);
          mealList = await fetchMealsForUser(token, dateStr);
        }
        const mealsByType = await getMealsWithContents(token, mealList);
        setMeals(mealsByType);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    loadMeals();
  }, [user, dateStr]);

  return { meals, loading, error, dateStr, parsedDate };
}
