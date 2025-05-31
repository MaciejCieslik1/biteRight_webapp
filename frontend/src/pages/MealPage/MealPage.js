import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import MealForm from "./MealForm";
import IngredientSearch from "./IngredientSearch";
import IngredientCreate from "./IngredientCreate";
import IngredientList from "./IngredientList";
import "./MealPage.css";

const MealPage = () => {
  const location = useLocation();
  const { meal } = location.state || {};
  const { user } = useContext(UserContext);

  const [currentMeal, setCurrentMeal] = useState(null);
  const [status, setStatus] = useState(null);

  const [ingredientQuery, setIngredientQuery] = useState("");
  const [ingredientResults, setIngredientResults] = useState([]);
  const [ingredientLoading, setIngredientLoading] = useState(false);
  const [ingredientError, setIngredientError] = useState(null);

  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [ingredientAmount, setIngredientAmount] = useState("");

  useEffect(() => {
    if (meal) {
      setCurrentMeal(meal);
    }
  }, [meal]);

  const searchIngredients = async (query) => {
    if (!query) {
      setIngredientResults([]);
      return;
    }
    setIngredientLoading(true);
    setIngredientError(null);
    try {
      const token = localStorage.getItem("jwt");
      const res = await fetch(
        `http://localhost:8080/ingredient/find/${query}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setIngredientResults(Array.isArray(data) ? data : []);
    } catch (e) {
      setIngredientError(e.message);
      setIngredientResults([]);
    } finally {
      setIngredientLoading(false);
    }
  };

  const addIngredientToMeal = async (ingredient, amount) => {
    const token = localStorage.getItem("jwt");
    const url = `http://localhost:8080/mealContent/add`;
    const body = {
      ingredientId: ingredient.ingredientId,
      mealId: currentMeal.mealId,
      ingredientAmount: amount,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const text = await response.text();
      let json = null;
      try {
        json = JSON.parse(text);
      } catch {}

      if (response.ok && json) {
        console.log("COntent added:", json);
        setCurrentMeal((prev) => ({
          ...prev,
          contents: [...(prev.contents || []), json],
        }));
        setStatus("Ingredient added successfully!");
      } else {
        setStatus("Ingredient add failed: " + (json?.message || text));
      }
    } catch (e) {
      setStatus("Unexpected error occurred.");
    }

    setIngredientQuery("");
    setIngredientResults([]);
  };

  const handleSave = async () => {
    if (!currentMeal) return;

    const body = {
      mealTypeId: currentMeal.mealTypeId,
      name: currentMeal.name,
      description: currentMeal.description,
      contents: currentMeal.contents || [],
    };

    const token = localStorage.getItem("jwt");
    const url = `http://localhost:8080/meal/update/${currentMeal.mealId}`;

    try {
      const response = await fetch(url, {
        method: "PUT",
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
        setCurrentMeal(json);
        setStatus("Saved successfully!");
      } else {
        setStatus("Save failed: " + (json?.message || text));
      }
    } catch (error) {
      setStatus("Unexpected error occurred.");
    }
  };

  if (!currentMeal) return <div>Loading meal data...</div>;

  return (
    <div className="meal-page-container" style={{ padding: "1rem" }}>
      <header className="meal-header">
        <h1>
          {currentMeal.mealTypeName?.[0].toUpperCase() +
            currentMeal.mealTypeName?.slice(1).toLowerCase()}
        </h1>
      </header>

      <MealForm meal={currentMeal} setMeal={setCurrentMeal} />

      <IngredientSearch
        query={ingredientQuery}
        results={ingredientResults}
        loading={ingredientLoading}
        error={ingredientError}
        onQueryChange={(val) => {
          setIngredientQuery(val);
          searchIngredients(val);
        }}
        onSelect={(ing) => {
          setSelectedIngredient(ing);
          setIngredientQuery("");
          setIngredientResults([]);
        }}
      />

      {selectedIngredient && (
        <div className="selected-ingredient-form">
          <p>
            Selected: <strong>{selectedIngredient.name}</strong>
          </p>
          <input
            type="number"
            placeholder="Amount (g)"
            value={ingredientAmount}
            onChange={(e) => setIngredientAmount(e.target.value)}
            min="0"
          />
          <button
            type="button"
            onClick={() => {
              if (
                !ingredientAmount ||
                isNaN(ingredientAmount) ||
                ingredientAmount <= 0
              ) {
                setStatus("Please enter a valid amount.");
                return;
              }
              addIngredientToMeal(selectedIngredient, Number(ingredientAmount));
              setSelectedIngredient(null);
              setIngredientAmount("");
            }}
          >
            Add Ingredient
          </button>
        </div>
      )}

      <IngredientCreate onStatus={setStatus} />

      <IngredientList contents={currentMeal.contents} />

      <footer className="meal-page-footer">
        <p>
          Date:{" "}
          {new Date(
            currentMeal.mealDate || currentMeal.meal_date
          ).toDateString()}
        </p>
        <button onClick={handleSave} className="save-btn">
          Save
        </button>
        {status && <p className="status-msg">{status}</p>}
      </footer>
    </div>
  );
};

export default MealPage;
