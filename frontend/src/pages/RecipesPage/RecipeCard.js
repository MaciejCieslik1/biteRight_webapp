import React from "react";
import "./RecipeCard.css";

const RecipeCard = ({ recipe, onClick, onDelete }) => {
  return (
    <div className="recipe-card">
      <div className="recipe-name">{recipe.name}</div>
      <div className="recipe-description">
        {recipe.description || "No description."}
      </div>
      <div className="recipe-actions">
        <button onClick={() => onClick(recipe)}>View</button>
      </div>
    </div>
  );
};

export default RecipeCard;
