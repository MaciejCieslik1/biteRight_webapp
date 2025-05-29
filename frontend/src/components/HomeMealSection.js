import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomeMealSection.css";

const HomeMealSection = ({ title, products }) => {
  const maxVisibleProducts = 3;
  const visibleProducts = products.slice(0, maxVisibleProducts);
  const moreProductsCount =
    products.length > maxVisibleProducts
      ? products.length - maxVisibleProducts
      : 0;
  const totalCalories = products.reduce(
    (sum, product) => sum + product.calories,
    0
  );
  const totalProtein = products.reduce(
    (sum, product) => sum + product.protein,
    0
  );
  const totalCarbs = products.reduce((sum, product) => sum + product.carbs, 0);
  const totalFat = products.reduce((sum, product) => sum + product.fat, 0);
  const navigate = useNavigate();
  const handleAddProductClick = () => {
    navigate("/meal");
  };
  return (
    <div className="meal-container">
      <div className="meal-header">
        <div className="meal-title">{title}</div>
        <div className="meal-calories">Calories: {totalCalories}</div>
      </div>
      <div className="meal-content">
        <div className="meal-products">
          {visibleProducts.map((product, index) => (
            <div key={index} className="product-item">
              {product.name} - {product.calories} kcal
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
          {" "}
          P: {totalProtein} B: {totalCarbs} F: {totalFat}
        </div>
      </div>
    </div>
  );
};
export default HomeMealSection;
