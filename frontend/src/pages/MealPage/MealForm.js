import React from "react";

const MealForm = ({ meal, setMeal }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form
      className="meal-form"
      style={{ maxWidth: "400px" }}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="form-group">
        <label htmlFor="name">Meal name:</label>
        <input
          id="name"
          name="name"
          value={meal.name}
          onChange={handleInputChange}
          type="text"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={meal.description}
          onChange={handleInputChange}
          rows="3"
        />
      </div>
    </form>
  );
};

export default MealForm;
