import React, { useState } from "react";
import "./MealForm.css";

const MealForm = ({ meal, setMeal }) => {
  const [editingField, setEditingField] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="meal-form" style={{ maxWidth: "400px" }}>
      <div className="form-group">
        <label htmlFor="name">Meal name:</label>

        {editingField === "name" ? (
          <input
            id="name"
            name="name"
            value={meal.name}
            onChange={handleInputChange}
            type="text"
            onBlur={() => setEditingField(null)}
            autoFocus
          />
        ) : (
          <div className="display-field">
            <div className="meal-page-name">
              {meal.name || <em>No name</em>}
            </div>
            <button
              className="edit-btn"
              type="button"
              onClick={() => setEditingField("name")}
            >
              Edit
            </button>
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description:</label>
        {editingField === "description" ? (
          <textarea
            id="description"
            name="description"
            value={meal.description}
            onChange={handleInputChange}
            rows="3"
            onBlur={() => setEditingField(null)}
            autoFocus
          />
        ) : (
          <div className="display-field">
            <div className="meal-page-description">
              {meal.description || <em>No description</em>}
            </div>
            <button
              className="edit-btn"
              type="button"
              onClick={() => setEditingField("description")}
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealForm;
