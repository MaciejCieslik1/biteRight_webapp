import React from "react";

const IngredientList = ({ contents = [] }) => {
  if (!contents.length) return <p>No ingredients added yet.</p>;
  console.log("[IngredientList] Rendering contents:", contents);
  return (
    <div className="ingredient-list">
      <h3>Ingredients in meal:</h3>
      <ul>
        {contents.map((ing, idx) => (
          <li key={ing.ingredientId || idx}>
            {ing.ingredientName}{" "}
            {ing.ingredientAmount ? `- ${ing.ingredientAmount} g` : ""}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientList;
