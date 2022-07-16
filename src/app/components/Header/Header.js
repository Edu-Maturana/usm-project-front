import React, { useState, useEffect } from "react";
import Logo from "../../../assets/images/Logo.svg";
import "primeicons/primeicons.css";
import "./Header.css";
import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";

import Cart from "../Cart/Cart";
import { getToken } from "../../api/token";
import { Button } from "primereact/button";

export default function Header() {
  const token = getToken();

  return (
    <div className="header">
      <div className="logo">
        <Link to="/" className="link-header">
          <img src={Logo} className="logo-style" />
          <h1 className="titulo">Los Rolls de la Negra</h1>
        </Link>
      </div>
      <MenuItems token={token} />
    </div>
  );
}

function MenuItems(props) {
  const { token } = props;
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
        {token ? (
          <Link to="/dashboard" className="dashboardButton">
            <Button label="Ir al Dashboard" icon="pi pi-pencil" />
          </Link>
        ) : null}
      </>
      <Cart visible={cartVisible} hide={setCartVisible} buttonsVisible={true} />
    </div>
  );
}
