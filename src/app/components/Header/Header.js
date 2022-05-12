import React from "react";
import "primeicons/primeicons.css";
import "./Header.css";

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
      <p className="menu-item">Home</p>
      <p className="menu-item">Productos</p>
      <p>|</p>
      <i className="pi pi-shopping-cart" style={{'fontSize': '1.2em'}} />
      <i className="pi pi-user" style={{'fontSize': '1.2em'}}/>
    </div>
  );
}
