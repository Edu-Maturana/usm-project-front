import React from "react";
import "primeicons/primeicons.css";
import "./Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      <div className="logo">
        <h3>LOGO</h3>
      </div>
      <MenuItems />
    </div>
  );
}

function MenuItems() {
  return (
    <div className="menu-items">
      <Link to="/" className="link">Home</Link>
      <Link to="/products" className="link">Productos</Link>
      <p>|</p>
      <Link to="/cart">
        <i className="pi pi-shopping-cart link" style={{'fontSize': '1.2em'}}  />
      </Link>
      <Link to="/myaccount">
        <i className="pi pi-user link" style={{'fontSize': '1.2em'}} />
      </Link>
    </div>
  );
}
