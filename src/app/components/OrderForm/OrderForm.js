import React from "react";
import "./OrderForm.css";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export default function OrderForm() {
  return (
    <div className="LoginForm">
      <div className="Login-container">
        <h3>Ingresa tus datos</h3>
        <InputText placeholder="Nombre" />
        <InputText placeholder="Dirección" />
        <Button label="Hacer pedido" />
      </div>
    </div>
  );
}
