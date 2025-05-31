import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export function useMealPage(initialMeal) {
  const { user } = useContext(UserContext);
  const [currentMeal, setCurrentMeal] = useState(initialMeal || null);
  const [status, setStatus] = useState(null);

  const [ingredientQuery, setIngredientQuery] = useState("");
  const [ingredientResults, setIngredientResults] = useState([]);
  const [ingredientLoading, setIngredientLoading] = useState(false);
  const [ingredientError, setIngredientError] = useState(null);

  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [ingredientAmount, setIngredientAmount] = useState("");

  useEffect(() => {
    if (initialMeal) {
      setCurrentMeal(initialMeal);
    }
  }, [initialMeal]);

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
    console.log("[useMealPage] Adding ingredient:", body);
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
    console.log("[useMealPage] Status after adding ingredient:", status);
    setIngredientQuery("");
    setIngredientResults([]);
  };

  const saveMeal = async () => {
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

  return {
    currentMeal,
    setCurrentMeal,
    status,
    setStatus,
    ingredientQuery,
    setIngredientQuery,
    ingredientResults,
    setIngredientResults,
    ingredientLoading,
    ingredientError,
    searchIngredients,
    selectedIngredient,
    setSelectedIngredient,
    ingredientAmount,
    setIngredientAmount,
    addIngredientToMeal,
    saveMeal,
  };
}
