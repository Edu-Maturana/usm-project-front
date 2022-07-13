import React, { useState, useEffect } from "react";
import "primeicons/primeicons.css";
import "./Header.css";
import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";

import Cart from "../Cart/Cart";

export default function Header() {
  return (
    <div className="header">
      <div className="logo">
        <Link to="/" className="link logo-content">
          LOGO
        </Link>
      </div>
      <MenuItems />
    </div>
  );
}

function MenuItems() {
  const [cartVisible, setCartVisible] = useState(false);
  const { products } = useCart();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="menu-items">
      <Link to="/" className="link">
        Home
      </Link>
      <Link to="/products" className="link">
        Productos
      </Link>
      <p>|</p>
      <>
        {products > 0 ? (
          <div className="total" onClick={() => setCartVisible(true)}>
            {products}
          </div>
        ) : null}
        <i
          className="pi pi-shopping-cart link"
          style={{ fontSize: "1.2em" }}
          onClick={() => setCartVisible(true)}
        />
      </>
      <Cart visible={cartVisible} hide={setCartVisible} buttonsVisible={true} />
    </div>
      );
    }
