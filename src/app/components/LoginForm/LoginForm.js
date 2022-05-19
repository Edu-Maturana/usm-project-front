import React from "react";
import "./LoginForm.css";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export default function LoginForm() {
  return (
    <div className="LoginForm">
      <div className="Login-container">
        <InputText placeholder="E-mail" />
        <InputText placeholder="Contraseña" type="password" />
        <Button label="Ingresar" />
      </div>
    </div>
  );
}
