import React from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "./ProductList";
import MealMacros from "./MealMacros";
import useMealInfo from "./useMealInfo";
import "./HomeMealSection.css";

const HomeMealSection = ({ title, meal, products }) => {
  const navigate = useNavigate();
  const { mealInfo, error } = useMealInfo(meal?.mealId);

  const handleAddProductClick = () => {
    navigate("/meal", { state: { meal, mealInfo } });
  };

  return (
    <div className="meal-container">
      <div className="meal-header">
        <div className="meal-title">{title}</div>
        <div className="meal-calories">Calories: {mealInfo?.calories}</div>
      </div>

      <div className="meal-content">
        <ProductList products={products} />
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
        <MealMacros
          protein={mealInfo?.protein}
          carbs={mealInfo?.carbs}
          fat={mealInfo?.fat}
        />
      </div>
    </div>
  );
};

export default HomeMealSection;
