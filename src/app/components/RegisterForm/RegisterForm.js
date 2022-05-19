import React from "react";
import "./RegisterForm.css";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export default function RegisterForm() {
  return (
    <div className="RegisterForm">
      <div className="RegisterForm-container">
        <InputText placeholder="Nombre" />
        <InputText placeholder="E-mail" />
        <InputText placeholder="Contraseña" type="password" />
        <InputText placeholder="Confirmar contraseña" type="password" />
        <Button label="Registrarse" />
      </div>
    </div>
  );
}
