import * as React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./app/views/Home/Home";
import AllProducts from "./app/views/AllProducts/AllProducts";
import Auth from "./app/views/Auth/Auth";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}