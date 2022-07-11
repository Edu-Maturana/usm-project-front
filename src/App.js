import React, { useMemo, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./app/views/Home/Home";
import AllProducts from "./app/views/AllProducts/AllProducts";
import ProductPage from "./app/views/ProductPage/ProductPage";
import OrderPage from "./app/views/OrderPage/OrderPage";
import Auth from "./app/views/Auth/Auth";

import CartContext from "./app/context/CartContext";
import {
  getProductsCart,
  addProductToCart,
  countProductsCart,
  clearCart,
  removeProductFromCart,
} from "./app/api/cart";

export default function App() {
  const [totalProducts, setTotalProducts] = useState(0);
  //const [reloadUser, setReloadUser] = useState(false);
  const [reloadCart, setReloadCart] = useState(false);

  useEffect(() => {
    setTotalProducts(countProductsCart());
    setReloadCart(false);
  }, [reloadCart]);

  const addProductCart = (product, quantity) => {
    addProductToCart(product, quantity);
    setReloadCart(true);
  };

  const removeProductCart = (product) => {
    removeProductFromCart(product);
    setReloadCart(true);
  };
  const clearCartProducts = () => {
    clearCart();
    setReloadCart(true);
  };
  const cartData = useMemo(
    () => ({
      products: totalProducts,
      addProduct: (product, quantity) => addProductCart(product, quantity),
      getProducts: getProductsCart,
      removeProduct: (product) => removeProductCart(product),
      clearCart: () => clearCartProducts(),
    }),
    [totalProducts]
  );

  return (
    <CartContext.Provider value={cartData}>
      <div className="App">
        <ToastContainer position="top-center" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </CartContext.Provider>
  );
}
