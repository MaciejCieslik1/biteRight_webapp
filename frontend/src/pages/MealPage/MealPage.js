import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useMealPage } from "./useMealPage";
import MealForm from "./MealForm";
import IngredientSearch from "./IngredientSearch";
import IngredientCreate from "./IngredientCreate";
import IngredientList from "./IngredientList";
import NavBar from "../../components/NavBar";
import "./MealPage.css";

const MealPage = () => {
  const location = useLocation();
  const { meal, mealInfo } = location.state || {};
  console.log("[MealPage] Received meal:", meal);
  console.log("[MealPage] Received mealInfo:", mealInfo);
  const {
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
  } = useMealPage(meal);

  useEffect(() => {
    if (meal) {
      setCurrentMeal(meal);
    }
  }, [meal, setCurrentMeal]);

  if (!currentMeal) return <div>Loading meal data...</div>;

  return (
    <div className="meal-page">
      <NavBar showButtons={false} />
      <div className="meal-page-container" style={{ padding: "1rem" }}>
        <div className="meal-page-left">
          <header className="meal-page-header">
            <MealForm meal={currentMeal} setMeal={setCurrentMeal} />
          </header>
          <button onClick={saveMeal} className="save-btn">
            Save
          </button>

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
              <div className="selected-ingredient-header">
                Adding: <strong>{selectedIngredient.name}</strong>
              </div>
              <input
                type="number"
                placeholder="Amount (g)"
                value={ingredientAmount}
                onChange={(e) => setIngredientAmount(e.target.value)}
                min="0"
              />
              <button
                className="add-ingredient-btn"
                onClick={() => {
                  if (
                    !ingredientAmount ||
                    isNaN(ingredientAmount) ||
                    ingredientAmount <= 0
                  ) {
                    setStatus("Please enter a valid amount.");
                    return;
                  }
                  addIngredientToMeal(
                    selectedIngredient,
                    Number(ingredientAmount)
                  );
                  setSelectedIngredient(null);
                  setIngredientAmount("");
                }}
              >
                Add
              </button>
              {status && <p className="status-msg">{status}</p>}
            </div>
          )}
        </div>

        <div className="meal-page-middle">
          <div className="meal-page-title-container">
            <div className="meal-page-title">
              {currentMeal.mealTypeName?.[0].toUpperCase() +
                currentMeal.mealTypeName?.slice(1).toLowerCase()}
            </div>
          </div>
          <IngredientList contents={currentMeal.contents} />
          <div className="meal-summary-container">
            <div className="meal-summary-title">Summary</div>
            <div className="meal-summary-content">
              <div className="meal-summary-calories">
                {mealInfo?.calories} kcal
              </div>
              <div className="meal-summary-macros">
                <div className="meal-macro-item">
                  <strong>P:</strong> {mealInfo?.protein || 0} g
                </div>
                <div className="meal-macro-item">
                  <strong>C:</strong> {mealInfo?.carbs || 0} g
                </div>
                <div className="meal-macro-item">
                  <strong>F:</strong> {mealInfo?.fat || 0} g
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="meal-page-right">
          <IngredientCreate onStatus={setStatus} />
        </div>
      </div>
    </div>
  );
};

export default MealPage;
