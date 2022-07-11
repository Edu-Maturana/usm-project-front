import React, { useState } from "react";
import "./OrderPage.css";
import Header from "../../components/Header/Header";
import { ProductsCart, EmptyCart } from "../../components/Cart/Cart";
import OrderForm from "../../components/OrderForm/OrderForm";
import Footer from "../../components/Footer/Footer";
import useCart from "../../hooks/useCart";

export default function OrderPage() {
  const { getProducts } = useCart();
  const products = getProducts();
  const [reloadCart, setReloadCart] = useState(false);

  return (
    <div className="OrderPage">
      <Header />
      <h2>Carro</h2>
      {products.length > 0 ? (
        <div className="FormStyle">
          <ProductsCart
            products={products}
            reloadCart={reloadCart}
            setReloadCart={setReloadCart}
          />
          <OrderForm />
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}
