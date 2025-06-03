import React from "react";
import "./HomeMealSection.css";

const MAX_VISIBLE_PRODUCTS = 3;

const ProductList = ({ products }) => {
  const visible = products.slice(0, MAX_VISIBLE_PRODUCTS);
  const remaining = products.length - visible.length;

  return (
    <div className="meal-products">
      {visible.map((product, index) => (
        <div key={index} className="product-item">
          {product.ingredientName} ({product.ingredientAmount}g)
        </div>
      ))}
      {remaining > 0 && (
        <div className="product-item more-indicator">+{remaining} more...</div>
      )}
    </div>
  );
};

export default ProductList;
