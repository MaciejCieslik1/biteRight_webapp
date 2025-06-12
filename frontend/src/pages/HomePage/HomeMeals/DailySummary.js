import React from "react";
import useMultipleMealInfo from "../../../hooks/useMultipleMealInfo";
import { calculateDailyTotalsFromMealInfo } from "../../../api/apiDailySummary";

const DailySummary = ({ mealIds }) => {
  const { mealInfos, error } = useMultipleMealInfo(mealIds);

  if (error) return <div>Błąd podsumowania: {error}</div>;
  if (!mealInfos.length) return <div>Ładowanie podsumowania...</div>;

  const totals = calculateDailyTotalsFromMealInfo(mealInfos);

  return (
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
          <div className="total-macros-text">F: {totals.fat.toFixed(1)} g</div>
        </div>
      </div>
    </div>
  );
};

export default DailySummary;
