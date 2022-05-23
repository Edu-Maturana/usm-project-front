import React, { useState, useEffect } from "react";
import "./ProductsList.css";

import { getProducts } from "../../api/products";
import ProductCard from "../ProductCard/ProductCard";
import { Link } from "react-router-dom";

export default function ProductsList(props) {
  const [products, setProducts] = useState([]);
  const home = props.home;

  useEffect(() => {
    getProducts().then((response) => {
      setProducts(response);
    });
  }, []);

  return (
    <div className="productsList">
      <div className="plist-top">
        {home ? (
          <>
            <h2>Últimos productos</h2>
            <Link to="/products" className="link">Ver todo</Link>
          </>
        ) : (
          <h2>Productos</h2>
        )}
      </div>
      <div className="p-products">
        {products.map((product) => (
          <Link to={`/products/${product.ID}`} key={product.id} className="ProductLink">
            <ProductCard key={product.ID} product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}
