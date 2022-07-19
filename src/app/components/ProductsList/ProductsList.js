import React, { useState, useEffect } from "react";
import "primeicons/primeicons.css";
import "./ProductsList.css";
import { Link } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";

import { getProducts } from "../../api/products";
import ProductCard from "../ProductCard/ProductCard";

export default function ProductsList(props) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const home = props.home;
  const [orderBy, setOrderBy] = useState("");
  const orders = [
    { value: "0", label: "Más recientes" },
    { value: "1", label: "Menor precio" },
    { value: "2", label: "Mayor precio" },
  ];
  const limit = home ? 6 : 20;

  useEffect(() => {
    setLoading(true);
    getProducts(orderBy, limit).then((response) => {
      setProducts(response);
      setLoading(false);
    });
  }, [orderBy]);

  return (
    <div className="productsList">
      <div className="plist-top">
        {home ? (
          <>
            <h2>Últimos productos</h2>
            <Link to="/products" className="all-products-link">
              Ver todo
              <i className="pi pi-angle-right" style={{ fontSize: "1.2em" }} />
            </Link>
          </>
        ) : (
          <div className="products-page-header">
            <h2>Todos los productos</h2>
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
        {loading ? (
          <i
            className="pi pi-spin pi-spinner spina"
            style={{ fontSize: "3em" }}
          ></i>
        ) : (
          products.map((product) => (
            <Link
              to={`/products/${product.ID}`}
              key={product.ID}
              className="ProductLink"
            >
              <ProductCard key={product.ID} product={product} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
