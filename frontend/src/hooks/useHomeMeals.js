import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
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
  // console.debug(`[fetchMealsForUser] Fetching meals for date: ${dateStr}`);
  const res = await fetch(`http://localhost:8080/meal/findByDate/${dateStr}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const errorText = await res.text();
    // console.error(`[fetchMealsForUser] Error response: ${errorText}`);
    throw new Error(errorText);
  }
  const data = await res.json();
  // console.debug(`[fetchMealsForUser] Fetched meals:`, data);
  return data;
}

async function createDefaultMeals(token, dateStr) {
  // console.debug(`[createDefaultMeals] Creating default meals for date: ${dateStr}`);
  await Promise.all(
    DEFAULT_MEALS.map(async (meal) => {
      const body = {
        mealTypeId: meal.mealTypeId,
        name: meal.name,
        description: meal.description,
        mealDate: `${dateStr}T12:00:00`,
        contents: [],
      };

      // console.debug(`[createDefaultMeals] Creating meal:`, body);
      const res = await fetch(`http://localhost:8080/meal/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorText = await res.text();
        // console.warn(`[createDefaultMeals] Failed to create ${meal.name}:`, errorText);
      } else {
        // console.debug(`[createDefaultMeals] Successfully created ${meal.name}`);
      }
    })
  );
}

async function getMealsWithContents(token, mealList) {
  // console.debug(`[getMealsWithContents] Fetching contents for meals:`, mealList);
  const mealsByType = {
    BREAKFAST: null,
    LUNCH: null,
    DINNER: null,
    SNACK: null,
  };

  for (const meal of mealList) {
    if (!meal.mealId || !meal.mealTypeName) {
      // console.warn(`[getMealsWithContents] Skipping invalid meal:`, meal);
      continue;
    }

    // console.debug(`[getMealsWithContents] Fetching contents for mealId ${meal.mealId}`);
    const res = await fetch(
      `http://localhost:8080/mealContent/findById/${meal.mealId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!res.ok) {
      // console.warn(`[getMealsWithContents] Failed to fetch contents for mealId ${meal.mealId}`);
      continue;
    }

    const contents = await res.json();
    // console.debug(`[getMealsWithContents] Contents for mealId ${meal.mealId}:`, contents);
    mealsByType[meal.mealTypeName] = { ...meal, contents };
  }

  // console.debug(`[getMealsWithContents] Completed mealsByType:`, mealsByType);
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
    // console.debug(`[useHomeMeals] Effect triggered for dateStr: ${dateStr} and user:`, user);

    if (!user) {
      // console.debug("[useHomeMeals] No user found, skipping fetch");
      return;
    }

    const token = localStorage.getItem("jwt");
    if (!token) {
      // console.debug("[useHomeMeals] No JWT token found, skipping fetch");
      return;
    }

    const loadMeals = async () => {
      // console.debug("[useHomeMeals] Loading meals...");
      setLoading(true);
      setError(null);
      try {
        let mealList = await fetchMealsForUser(token, dateStr);
        // console.debug("[useHomeMeals] Initial mealList:", mealList);
        if (mealList.length === 0) {
          // console.debug("[useHomeMeals] No meals found, creating defaults");
          await createDefaultMeals(token, dateStr);
          mealList = await fetchMealsForUser(token, dateStr);
          // console.debug("[useHomeMeals] Reloaded mealList after defaults created:", mealList);
        }
        const mealsByType = await getMealsWithContents(token, mealList);
        // console.debug("[useHomeMeals] Setting meals state:", mealsByType);
        setMeals(mealsByType);
      } catch (e) {
        // console.error("[useHomeMeals] Error loading meals:", e.message);
        setError(e.message);
      } finally {
        setLoading(false);
        // console.debug("[useHomeMeals] Finished loading meals");
      }
    };

    loadMeals();
  }, [user, dateStr]);

  return { meals, loading, error, dateStr, parsedDate };
}
