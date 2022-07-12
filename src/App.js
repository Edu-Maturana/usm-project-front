import React, { useMemo, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./app/views/Home/Home";
import AllProducts from "./app/views/AllProducts/AllProducts";
import ProductPage from "./app/views/ProductPage/ProductPage";
import OrderPage from "./app/views/OrderPage/OrderPage";
import Auth from "./app/views/Auth/Auth";

import AuthContext from "./app/context/AuthContext";
import CartContext from "./app/context/CartContext";
import { setToken, getToken, removeToken } from "./app/api/token";
import {
  getProductsCart,
  addProductToCart,
  countProductsCart,
  clearCart,
  removeProductFromCart,
} from "./app/api/cart";

export default function App() {
  const [auth, setAuth] = useState(undefined);
  const [totalProducts, setTotalProducts] = useState(0);
  const [reloadUser, setReloadUser] = useState(false);
  const [reloadCart, setReloadCart] = useState(false);

  useEffect(() => {
    setTotalProducts(countProductsCart());
    setReloadCart(false);
  }, [reloadCart]);

  useEffect(() => {
    setTotalProducts(countProductsCart());
    setReloadCart(false);
  }, [reloadCart, auth]);

  const login = (token) => {
    setToken(token);
    setAuth({
      token,
      user: jwtDecode(token).id,
    });
  };

  const logout = () => {
    if (auth) {
      removeToken();
      clearCart();
      setAuth(null);
      window.location.href = "/";
    }
  };

  const data = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }),
    [auth]
  );

  const addProductCart = (id, quantity) => {
    addProductToCart(id, quantity);
    setReloadCart(true);
  };

  const removeProductCart = (id) => {
    removeProductFromCart(id);
    setReloadCart(true);
  };

  const clearCartProducts = () => {
    clearCart();
    setReloadCart(true);
  };

  const cartData = useMemo(
    () => ({
      products: totalProducts,
      addProduct: (id, quantity) => addProductCart(id, quantity),
      getProducts: getProductsCart,
      removeProduct: (id) => removeProductCart(id),
      clearCart: () => clearCartProducts(),
    }),
    [totalProducts]
  );

  return (
    <AuthContext.Provider value={data}>
      <CartContext.Provider value={cartData}>
        <div className="App">
          <ToastContainer position="top-center" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/admin" element={<Auth />} />
          </Routes>
        </div>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}
