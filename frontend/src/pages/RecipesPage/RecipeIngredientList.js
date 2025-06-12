import React from "react";
import "./RecipePage.css";

const RecipeIngredientList = ({ contents = [], onDelete }) => {
  return (
    <div className="ingredient-list">
      <div className="ingredient-list-title">Ingredients:</div>
      <ul>
        {contents.length === 0 ? (
          <li style={{ fontStyle: "italic", color: "#888" }}>
            No ingredients added yet.
          </li>
        ) : (
          contents.map((ing) => (
            <li key={ing.recipeContentId}>
              <span className="ingredient-name">{ing.ingredientName}</span>

              <div className="ingredient-actions">
                {ing.ingredientAmount ? (
                  <span className="ingredient-amount">
                    {ing.ingredientAmount} g
                  </span>
                ) : (
                  ""
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(ing.recipeContentId)}
                    className="delete-ingredient-btn"
                  >
                    ❌
                  </button>
                )}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default RecipeIngredientList;