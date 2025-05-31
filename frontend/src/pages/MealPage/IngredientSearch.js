import React from "react";

const IngredientSearch = ({
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
      {loading && <p>Loading ingredients...</p>}
      {error && <p className="error">{error}</p>}
      {results.length > 0 && (
        <ul className="ingredient-results-list">
          {results.map((ing) => (
            <li key={ing.id} onClick={() => onSelect(ing)}>
              {ing.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IngredientSearch;
