import React from "react";
import "./ProductPage.css";

import Header from "../../components/Header/Header";
import { ProductContent } from "../../components/ProductContent/ProductContent";

export default function ProductPage() {
  return (
    <div className="ProductPage">
      <Header />
      <ProductContent />
    </div>
  );
}
