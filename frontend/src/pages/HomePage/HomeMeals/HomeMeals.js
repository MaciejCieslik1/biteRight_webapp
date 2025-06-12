import React from "react";
import MealSection from "../HomeMealSection/HomeMealSection";
import { useHomeMeals } from "../../../hooks/useHomeMeals";
import { getWeekdayName } from "./HomeMealsUtils";
import DailySummary from "./DailySummary";
import "../styles/HomeMeals.css";

const HomeMeals = ({ selectedDate = new Date() }) => {
  const { meals, loading, error, parsedDate } = useHomeMeals(selectedDate);

  if (loading) return <div>Loading meals...</div>;
  if (error) return <div>Error: {error}</div>;

  const mealIds = Object.values(meals)
    .filter(Boolean)
    .map((meal) => meal.mealId);

  return (
    <div className="mealplan-container">
      <div className="today-text">
        {parsedDate.toDate().toDateString()} ({getWeekdayName(parsedDate)})
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
          meal={meals.SNACKS}
          products={meals.SNACKS?.contents || []}
        />
      </div>

      <DailySummary mealIds={mealIds} />
    </div>
  );
};

export default HomeMeals;
