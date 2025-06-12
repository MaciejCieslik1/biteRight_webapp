import React from "react";
import RecipeIngredientList from "./RecipeIngredientList";
import "./RecipePage.css";

const RecipeViewModal = ({ recipe, onClose, onEdit, onDelete }) => {
  if (!recipe) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{recipe.name}</h2>
        <p>{recipe.description || "No description."}</p>
        <RecipeIngredientList contents={recipe.contents || []} />

        <div className="modal-actions">
          <button className="edit-btn" onClick={onEdit}>✏️ Edit</button>
          <button className="delete-btn" onClick={() => onDelete(recipe.recipeId)}>🗑️ Delete</button>
          <button className="close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default RecipeViewModal;
