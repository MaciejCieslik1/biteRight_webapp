import React from "react";
import { FaTrash } from "react-icons/fa";
import "./styles/IngredientList.css";

const IngredientList = ({ contents = [], onDelete }) => {
  if (!contents.length) return <p>No ingredients added yet.</p>;

  console.log("[IngredientList] Rendering contents:", contents);

  return (
    <div className="ingredient-list">
      <div className="ingredient-list-title">Ingredients:</div>
      <ul>
        {contents.map((ing, idx) => (
          <li key={idx} className="ingredient-list-item">
            <strong>{ing.ingredient?.name || ing.ingredientName}</strong>{" "}
            {ing.ingredientAmount ? `- ${ing.ingredientAmount} g` : ""}
            {onDelete && (
              <button
                className="ingredient-delete-btn"
                onClick={() => onDelete(ing.mealContentId)}
              >
                <FaTrash />
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientList;
