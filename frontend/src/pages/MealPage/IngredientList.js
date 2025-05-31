import React from "react";
import "./IngredientList.css";
const IngredientList = ({ contents = [] }) => {
  if (!contents.length) return <p>No ingredients added yet.</p>;
  console.log("[IngredientList] Rendering contents:", contents);
  return (
    <div className="ingredient-list">
      <div className="ingredient-list-title">Ingredients:</div>
      <ul>
        {contents.map((ing, idx) => (
          <li key={idx}>
            <strong>{ing.ingredientName}</strong>{" "}
            {ing.ingredientAmount ? `- ${ing.ingredientAmount} g` : ""}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientList;
