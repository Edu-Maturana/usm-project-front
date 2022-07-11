import React, { useState, useEffect } from "react";
import "./ProductsList.css";
import { Link } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";

import { getProducts } from "../../api/products";
import ProductCard from "../ProductCard/ProductCard";

export default function ProductsList(props) {
  const [products, setProducts] = useState([]);
  const home = props.home;
  const [orderBy, setOrderBy] = useState("");
  const orders = [
    { value: "0", label: "Más recientes" },
    { value: "1", label: "Menor precio" },
    { value: "2", label: "Mayor precio" },
  ];

  useEffect(() => {
    getProducts(orderBy).then((response) => {
      setProducts(response);
    });
  }, [orderBy]);
 
  return (
    <div className="productsList">
      <div className="plist-top">
        {home ? (
          <>
            <h2>Últimos productos</h2>
            <Link to="/products" className="link">
              Ver todo
            </Link>
          </>
        ) : (
          <div className="products-page-header">
            <h2>Productos</h2>
            <Dropdown
              options={orders}
              onChange={(e) => setOrderBy(e.value)}
              value={orderBy}
              placeholder="Ordenar por"
            />

          </div>
        )}
      </div>
      <div className="p-products">
        {products.map((product) => (
          <Link
            to={`/products/${product.ID}`}
            key={product.id}
            className="ProductLink"
          >
            <ProductCard key={product.ID} product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}

 
