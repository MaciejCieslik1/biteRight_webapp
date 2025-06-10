import React from "react";
import "./RecipePage.css";

const RecipeIngredientSearch = ({
  query,
  results,
  loading,
  error,
  onQueryChange,
  onSelect,
}) => {
  return (
    <div className="ingredient-search">
      <label htmlFor="ingredientSearch">Add ingredient:</label>
      <input
        id="ingredientSearch"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        type="text"
        placeholder="Type ingredient name..."
        autoComplete="off"
      />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {results.length > 0 && (
        <ul className="ingredient-results-list">
          {results.map((ing) => (
            <li key={ing.ingredientId} onClick={() => onSelect(ing)}>
              {ing.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeIngredientSearch;
