import React, { useState } from "react";
import "../MealPage/styles/IngredientCreate.css";

const RecipeIngredientCreate = ({ onStatus }) => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [portionSize, setPortionSize] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [fat, setFat] = useState("");
  const [carbs, setCarbs] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreate = async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("jwt");
    const res = await fetch("http://localhost:8080/ingredient/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        brand: brand || null,
        portionSize: portionSize ? Number(portionSize) : null,
        calories: calories ? Number(calories) : null,
        protein: protein ? Number(protein) : null,
        fat: fat ? Number(fat) : null,
        carbs: carbs ? Number(carbs) : null,
      }),
    });

    const text = await res.text();
    let json = null;
    try {
      json = JSON.parse(text);
    } catch {}

    if (res.ok && json) {
      onStatus("Ingredient created!");
      setName("");
      setBrand("");
      setPortionSize("");
      setCalories("");
      setProtein("");
      setFat("");
      setCarbs("");
    } else {
      setError(json?.message || text);
    }

    setLoading(false);
  };

  return (
    <div className="ingredient-create">
      <div className="ingredient-create-header">
        <strong>Your ingredient is not in the database?</strong>
      </div>
      <div className="ingredient-create-header">You can create it here!</div>
      <div className="ingredient-create-content">
        <div className="ingredient-create-title">Create Ingredient</div>
        <input
          placeholder="Name*"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <input
          type="number"
          placeholder="Portion size (g)"
          value={portionSize}
          onChange={(e) => setPortionSize(e.target.value)}
        />
        <input
          type="number"
          placeholder="Calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />
        <input
          type="number"
          placeholder="Protein"
          value={protein}
          onChange={(e) => setProtein(e.target.value)}
        />
        <input
          type="number"
          placeholder="Fat"
          value={fat}
          onChange={(e) => setFat(e.target.value)}
        />
        <input
          type="number"
          placeholder="Carbs"
          value={carbs}
          onChange={(e) => setCarbs(e.target.value)}
        />

        <button
          className="create-ingredient-btn"
          onClick={handleCreate}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create"}
        </button>

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default RecipeIngredientCreate;
