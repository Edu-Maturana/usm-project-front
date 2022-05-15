import React from "react";
import "./ProductCard.css";

export default function ProductCard(props) {
  const { product } = props;
  return (
    <div className="p-card">
      <div className="p-card-img">
        <img className="p-img" src={product.image} alt={product.name} />
      </div>
      <div className="p-card-info">
        <h3 className="p-name">{product.name}</h3>
        <p className="p-price">${product.price}</p>
      </div>
    </div>
  );
}
