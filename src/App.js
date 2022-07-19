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
  updateProductFromCart,
  clearCart,
  removeProductFromCart,
} from "./app/api/cart";
import Dashboard from "./app/views/Dashboard/Dashboard";

export default function App() {
  const [auth, setAuth] = useState(undefined);
  const [totalProducts, setTotalProducts] = useState(0);
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
      user: jwtDecode(token).email,
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

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
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

  const updateProductCart = (id, quantity) => {
    updateProductFromCart(id, quantity);
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
      updateProduct: (id, quantity) => updateProductCart(id, quantity),
      clearCart: () => clearCartProducts(),
    }),
    [totalProducts]
  );

  return (
    <AuthContext.Provider value={authData}>
      <CartContext.Provider value={cartData}>
        <div className="App">
          <ToastContainer position="top-center" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/admin" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}
