import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeMealSection.css";

const HomeMealSection = ({ title, meal, products }) => {
  const [mealInfo, setMealInfo] = useState(null);
  const [error, setError] = useState(null);
  const maxVisibleProducts = 3;

  const visibleProducts = products.slice(0, maxVisibleProducts);
  const moreProductsCount =
    products.length > maxVisibleProducts
      ? products.length - maxVisibleProducts
      : 0;

  const navigate = useNavigate();

  // Fetch MealInfo from backend
  useEffect(() => {
    if (!meal || !meal.mealId) return;

    console.log("[mealSection] Fetching meal info for mealId:", meal.mealId);
    const token = localStorage.getItem("jwt");
    if (!token) {
      setError("No JWT token found");
      return;
    }

    const fetchMealInfoById = async (id) => {
      try {
        const res = await fetch(`http://localhost:8080/mealInfo/find/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`Failed to fetch meal info: ${errText}`);
        }
        const data = await res.json();
        console.log("Fetched meal info:", data);
        setMealInfo(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMealInfoById(meal.mealId);
  }, [meal]);

  const handleAddProductClick = () => {
    navigate("/meal", { state: { meal } });
  };

  return (
    <div className="meal-container">
      <div className="meal-header">
        <div className="meal-title">{title}</div>
        <div className="meal-calories">
          Calories: {(mealInfo && mealInfo.calories) || 0}
        </div>
      </div>
      <div className="meal-content">
        <div className="meal-products">
          {visibleProducts.map((product, index) => (
            <div key={index} className="product-item">
              {product.ingredientName} ({product.ingredientAmount}g)
            </div>
          ))}
          {moreProductsCount > 0 && (
            <div className="product-item more-indicator">
              +{moreProductsCount} more...
            </div>
          )}
        </div>
        <div className="add-product-button-container">
          <button
            className="add-product-button"
            onClick={handleAddProductClick}
          >
            +
          </button>
        </div>
      </div>
      <div className="meal-footer">
        <div className="meal-macros">
          P: {(mealInfo && mealInfo.protein) || 0} C:{" "}
          {(mealInfo && mealInfo.carbs) || 0} F:{" "}
          {(mealInfo && mealInfo.fat) || 0}
        </div>
      </div>
    </div>
  );
};

export default HomeMealSection;
