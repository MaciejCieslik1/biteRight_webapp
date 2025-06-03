import React from "react";
import MealSection from "../HomeMealSection/HomeMealSection";
import { useHomeMeals } from "./useHomeMeals";
import { calculateDailyTotals, getWeekdayName } from "./HomeMealsUtils";
import "./HomeMeals.css";

const HomeMeals = ({ selectedDate = new Date() }) => {
  const { meals, loading, error, parsedDate } = useHomeMeals(selectedDate);

  const totals = calculateDailyTotals(meals);

  if (loading) return <div>Loading meals...</div>;
  if (error) return <div>Error: {error}</div>;

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
