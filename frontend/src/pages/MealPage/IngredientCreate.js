import React, { useState } from "react";
import "./styles/IngredientCreate.css";

const IngredientCreate = ({ onStatus }) => {
  const [newIngredientName, setNewIngredientName] = useState("");
  const [newIngredientBrand, setNewIngredientBrand] = useState("");
  const [newIngredientPortionSize, setNewIngredientPortionSize] = useState("");
  const [newIngredientCalories, setNewIngredientCalories] = useState("");
  const [newIngredientProtein, setNewIngredientProtein] = useState("");
  const [newIngredientFat, setNewIngredientFat] = useState("");
  const [newIngredientCarbs, setNewIngredientCarbs] = useState("");

  const [creatingIngredient, setCreatingIngredient] = useState(false);
  const [createIngredientError, setCreateIngredientError] = useState(null);

  const handleCreateIngredient = async () => {
    if (!newIngredientName.trim()) {
      setCreateIngredientError("Name cannot be empty");
      return;
    }

    setCreatingIngredient(true);
    setCreateIngredientError(null);
    onStatus(null);

    const body = {
      name: newIngredientName.trim(),
      brand: newIngredientBrand.trim() || null,
      portionSize: newIngredientPortionSize
        ? Number(newIngredientPortionSize)
        : null,
      calories: newIngredientCalories ? Number(newIngredientCalories) : null,
      protein: newIngredientProtein ? Number(newIngredientProtein) : null,
      fat: newIngredientFat ? Number(newIngredientFat) : null,
      carbs: newIngredientCarbs ? Number(newIngredientCarbs) : null,
    };

    try {
      const token = localStorage.getItem("jwt");
      const response = await fetch("http://localhost:8080/ingredient/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const text = await response.text();
      let json = null;
      try {
        json = JSON.parse(text);
      } catch {}

      if (response.ok && json) {
        onStatus("Ingredient created successfully!");
        setNewIngredientName("");
        setNewIngredientBrand("");
        setNewIngredientPortionSize("");
        setNewIngredientCalories("");
        setNewIngredientProtein("");
        setNewIngredientFat("");
        setNewIngredientCarbs("");
      } else {
        setCreateIngredientError(json?.message || text);
      }
    } catch (error) {
      setCreateIngredientError("Unexpected error occurred.");
    }

    setCreatingIngredient(false);
  };

  return (
    <div className="ingredient-create">
      <div className="ingredient-create-header">
        <strong>Your ingredient is not in the database?</strong>
      </div>
      <div className="ingredient-create-header">You can create it here!</div>
      <div className="ingredient-create-content">
        <div className="ingredient-create-title">Create new ingredient</div>
        <input
          type="text"
          placeholder="Name*"
          value={newIngredientName}
          onChange={(e) => setNewIngredientName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Brand"
          value={newIngredientBrand}
          onChange={(e) => setNewIngredientBrand(e.target.value)}
        />
        <input
          type="number"
          placeholder="Portion size (g)"
          value={newIngredientPortionSize}
          onChange={(e) => setNewIngredientPortionSize(e.target.value)}
          min="0"
        />
        <input
          type="number"
          placeholder="Calories"
          value={newIngredientCalories}
          onChange={(e) => setNewIngredientCalories(e.target.value)}
          min="0"
        />
        <input
          type="number"
          placeholder="Protein (g)"
          value={newIngredientProtein}
          onChange={(e) => setNewIngredientProtein(e.target.value)}
          min="0"
        />
        <input
          type="number"
          placeholder="Fat (g)"
          value={newIngredientFat}
          onChange={(e) => setNewIngredientFat(e.target.value)}
          min="0"
        />
        <input
          type="number"
          placeholder="Carbs (g)"
          value={newIngredientCarbs}
          onChange={(e) => setNewIngredientCarbs(e.target.value)}
          min="0"
        />

        <button
          className="create-ingredient-btn"
          type="button"
          onClick={handleCreateIngredient}
          disabled={creatingIngredient}
        >
          {creatingIngredient ? "Creating..." : "Create Ingredient"}
        </button>

        {createIngredientError && (
          <p className="error">{createIngredientError}</p>
        )}
      </div>
    </div>
  );
};

export default IngredientCreate;
