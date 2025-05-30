import React, { useState, useContext, useEffect } from "react";
import MealSection from "../HomeMealSection";
import { UserContext } from "../../../contexts/UserContext";
import dayjs from "dayjs";
import "./HomeMeals.css";

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

const HomeMeals = ({ selectedDate = new Date() }) => {
  const { user } = useContext(UserContext);
  const parsedDate = dayjs(selectedDate);
  const dateStr = parsedDate.format("YYYY-MM-DD");

  const [meals, setMeals] = useState(emptyMealsState);

  useEffect(() => {
    console.log("[HomeMeals] useEffect triggered", { user, dateStr });
    if (!user) {
      console.log("[HomeMeals] No user - abort fetch");
      return;
    }

    const token = localStorage.getItem("jwt");
    if (!token) {
      console.log("[HomeMeals] No JWT token found - abort fetch");
      return;
    }

    const fetchMeals = async () => {
      try {
        console.log("[HomeMeals] Fetching meals from backend", { dateStr });
        let mealList = await fetchMealsFromBackend(token, dateStr);
        console.log("[HomeMeals] Meals fetched:", mealList);

        if (mealList.length === 0) {
          console.log(
            "[HomeMeals] No meals found for date, creating default meals"
          );
          await createDefaultMeals(token, dateStr);
          mealList = await fetchMealsFromBackend(token, dateStr);
          console.log("[HomeMeals] Meals after creating defaults:", mealList);
        }

        const mealsByType = await getMealsWithContents(token, mealList);
        console.log("[HomeMeals] Meals with contents:", mealsByType);
        setMeals(mealsByType);
      } catch (err) {
        console.error("[HomeMeals] Error fetching meals:", err);
      }
    };

    fetchMeals();
  }, [user, dateStr]);

  const fetchMealsFromBackend = async (token, dateStr) => {
    console.log("[fetchMealsFromBackend] Fetching meals for date:", dateStr);
    const res = await fetch(
      `http://localhost:8080/meal/findByDate/${dateStr}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!res.ok) {
      const error = await res.text();
      console.error(
        "[fetchMealsFromBackend] Error response:",
        res.status,
        error
      );
      throw new Error(`Error fetching meals: ${res.status} - ${error}`);
    }

    const data = await res.json();
    console.log("[fetchMealsFromBackend] Received data:", data);
    return data;
  };

  const createDefaultMeals = async (token, dateStr) => {
    console.log("[createDefaultMeals] Creating default meals", DEFAULT_MEALS);
    await Promise.all(
      DEFAULT_MEALS.map(async (meal) => {
        const body = {
          mealTypeId: meal.mealTypeId,
          name: meal.name,
          description: meal.description,
          mealDate: `${dateStr}T12:00:00`,
          contents: [],
        };
        console.log("[createDefaultMeals] Creating meal:", meal);
        console.log("[createDefaultMeals] Request body:", body);
        console.log("[createDefaultMeals] Request headers:", {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        });

        try {
          const res = await fetch(`http://localhost:8080/meal/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
          });

          console.log(
            `[createDefaultMeals] Response status for ${meal.name}:`,
            res.status
          );
          const responseText = await res.text();
          console.log(
            `[createDefaultMeals] Response body for ${meal.name}:`,
            responseText
          );

          if (!res.ok) {
            console.error(
              `[createDefaultMeals] Failed to create ${meal.name}: ${responseText}`
            );
          } else {
            console.log(
              `[createDefaultMeals] Successfully created ${meal.name}`
            );
          }
        } catch (error) {
          console.error(
            `[createDefaultMeals] Exception creating ${meal.name}:`,
            error
          );
        }
      })
    );
  };

  const getMealsWithContents = async (token, mealList) => {
    console.log(
      "[getMealsWithContents] Fetching contents for meals:",
      mealList
    );
    const mealsByType = { ...emptyMealsState };

    for (const meal of mealList) {
      if (!meal.mealId || !meal.mealTypeName) {
        console.warn("[getMealsWithContents] Skipping invalid meal:", meal);
        continue;
      }

      try {
        console.log(
          `[getMealsWithContents] Fetching contents for mealId ${meal.mealId} (${meal.name})`
        );
        const res = await fetch(
          `http://localhost:8080/mealContent/findById/${meal.mealId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) {
          const error = await res.text();
          console.error(
            `[getMealsWithContents] Failed to fetch content for ${meal.name}: ${error}`
          );
          continue;
        }

        const contents = await res.json();
        console.log(
          `[getMealsWithContents] Contents for ${meal.name}:`,
          contents
        );
        mealsByType[meal.mealTypeName] = { ...meal, contents };
      } catch (err) {
        console.error(
          `[getMealsWithContents] Error processing meal ${meal.name}:`,
          err
        );
      }
    }

    console.log("[getMealsWithContents] Result mealsByType:", mealsByType);
    return mealsByType;
  };

  const calculateDailyTotals = () => {
    console.log("[calculateDailyTotals] Calculating totals from meals:", meals);
    const allMeals = Object.values(meals)
      .filter(Boolean)
      .flatMap((meal) => meal.contents || []);

    console.log("[calculateDailyTotals] Flattened meal contents:", allMeals);

    return allMeals.reduce(
      (totals, item) => {
        totals.calories += item.calories || 0;
        totals.protein += item.protein || 0;
        totals.carbs += item.carbs || 0;
        totals.fat += item.fat || 0;
        return totals;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  const getWeekdayName = (date) =>
    new Date(date).toLocaleDateString("en-US", { weekday: "long" });

  const totals = calculateDailyTotals();

  console.log("[HomeMeals] Render with totals:", totals);

  return (
    <div className="mealplan-container">
      <div className="today-text">
        {parsedDate.toDate().toDateString()} (
        {getWeekdayName(parsedDate.toDate())})
      </div>

      <div className="meals-container">
        <MealSection
          title="Breakfast"
          meal={meals.BREAKFAST}
          products={meals.BREAKFAST?.contents || []}
        />
        <MealSection
          title="Lunch"
          meal={meals.LUNCH}
          products={meals.LUNCH?.contents || []}
        />
        <MealSection
          title="Dinner"
          meal={meals.DINNER}
          products={meals.DINNER?.contents || []}
        />
        <MealSection
          title="Snacks"
          meal={meals.SNACK}
          products={meals.SNACK?.contents || []}
        />
      </div>

      <div className="daily-summary-container">
        <div className="daily-summary-header">Total</div>
        <div className="daily-summary-content-container">
          <div className="total-calories-text">{totals.calories} kcal</div>
          <div className="total-macros-container">
            <div className="total-macros-text">
              P: {totals.protein.toFixed(1)} g
            </div>
            <div className="total-macros-text">
              C: {totals.carbs.toFixed(1)} g
            </div>
            <div className="total-macros-text">
              F: {totals.fat.toFixed(1)} g
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeMeals;
