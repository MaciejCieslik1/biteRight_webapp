import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { fetchMealInfo } from "../api/apiMealInfo";
import {
  searchIngredientsAPI,
  addIngredientToMealAPI,
  updateMealAPI,
  deleteIngredientFromMealAPI,
} from "../api/apiMeal";

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
  const [mealInfo, setMealInfo] = useState(null);

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
      const data = await searchIngredientsAPI(query, token);
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
    const result = await addIngredientToMealAPI(
      {
        ingredientId: ingredient.ingredientId,
        mealId: currentMeal.mealId,
        ingredientAmount: amount,
      },
      token
    );

    if (result.success && result.data) {
      setCurrentMeal((prev) => ({
        ...prev,
        contents: [...(prev.contents || []), result.data],
      }));
      setStatus("Ingredient added successfully!");
      try {
        const info = await fetchMealInfo(currentMeal.mealId);
        setMealInfo(info);
      } catch (e) {
        console.warn(
          "Failed to fetch meal info after adding ingredient:",
          e.message
        );
      }
    } else {
      setStatus(
        "Ingredient add failed: " + (result.data?.message || result.raw)
      );
    }

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
    const result = await updateMealAPI(currentMeal.mealId, body, token);

    if (result.success && result.data) {
      setCurrentMeal(result.data);
      setStatus("Saved successfully!");
      try {
        const info = await fetchMealInfo(currentMeal.mealId);
        setMealInfo(info);
      } catch (e) {
        setStatus("Meal saved, but fetching meal info failed: " + e.message);
      }
    } else {
      setStatus("Save failed: " + (result.data?.message || result.raw));
    }
  };

  const removeIngredientFromMeal = async (mealContentId) => {
    const token = localStorage.getItem("jwt");
    const result = await deleteIngredientFromMealAPI(mealContentId, token);

    if (result.success) {
      setCurrentMeal((prev) => ({
        ...prev,
        contents: prev.contents?.filter(
          (item) => item.mealContentId !== mealContentId
        ),
      }));
      setStatus("Ingredient removed successfully.");
      try {
        const info = await fetchMealInfo(currentMeal.mealId);
        setMealInfo(info);
      } catch (e) {
        console.warn(
          "Failed to fetch meal info after removing ingredient:",
          e.message
        );
      }
    } else {
      setStatus("Failed to remove ingredient: " + result.raw);
    }
  };

  useEffect(() => {
    const loadMealInfo = async () => {
      if (!currentMeal?.mealId) return;
      try {
        const info = await fetchMealInfo(currentMeal.mealId);
        setMealInfo(info);
      } catch (e) {
        console.error("[useMealPage] Failed to load meal info:", e.message);
      }
    };

    loadMealInfo();
  }, [currentMeal?.mealId]);

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
    mealInfo,
    setMealInfo,
    removeIngredientFromMeal,
  };
}
