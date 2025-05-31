import React from "react";

const MealMacros = ({ protein = 0, carbs = 0, fat = 0 }) => (
  <div className="meal-macros">
    P: {protein} C: {carbs} F: {fat}
  </div>
);

export default MealMacros;
