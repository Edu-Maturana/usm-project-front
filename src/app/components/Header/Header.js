import React, { useState } from "react";
import "primeicons/primeicons.css";
import "./Header.css";
import { Link } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";

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
  const [visible, setVisible] = useState(false);
  return (
    <div className="menu-items">
      <Link to="/" className="link">
        Home
      </Link>
      <Link to="/products" className="link">
        Productos
      </Link>
      <p>|</p>
      <i
        className="pi pi-shopping-cart link"
        style={{ fontSize: "1.2em" }}
        onClick={() => setVisible(true)}
      />
      <Link to="/auth">
        <i className="pi pi-user link" style={{ fontSize: "1.2em" }} />
      </Link>
      <Sidebar
        visible={visible}
        position="right"
        onHide={() => setVisible(false)}
      >
        <h2>Carrito</h2>
        <p>No hay productos en el carrito</p>
      </Sidebar>
    </div>
  );
}
