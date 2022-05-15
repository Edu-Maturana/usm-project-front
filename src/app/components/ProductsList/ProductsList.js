import React, { useState, useEffect } from "react";
import "./ProductsList.css";

import { getProducts } from "../../api/products";
import ProductCard from "../ProductCard/ProductCard";

export default function ProductsList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((response) => {
      setProducts(response);
    });
  }, []);

  return (
    <div className="productsList">
      <div className="plist-top">
        <h2>Últimos productos</h2>
        <p>Ver todo</p>
      </div>
      <div className="p-products">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
