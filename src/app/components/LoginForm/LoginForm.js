import React, { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import useAuth from "../../hooks/useAuth";
import { LogIn } from "../../api/auth";

import "./LoginForm.css";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.email) {
        errors.email = "El email es requerido";
      }

      if (!values.password) {
        errors.password = "La contraseña es requerida";
      }

      return errors;
    },
    onSubmit: (values) => {
      setLoading(true);
      LogIn(values)
        .then((response) => {
          login(response.token);
          toast.success("Bienvenido(a)!");
          setTimeout(() => {
            window.location = "/dashboard";
          }, 1000);
        })
        .catch((error) => {
          toast.error("Credenciales inválidas");
        });
    },
  });

  return (
    <div className="Login">
      <form className="login-form" onSubmit={formik.handleSubmit}>
        <h2 className="title">Iniciar sesión</h2>
        <div className="form-group">
          <label className="Label">Email</label>
          <InputText
            type="email"
            name="email"
            className="Input"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label className="Label">Contraseña</label>
          <InputText
            type="password"
            name="password"
            className="Input"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </div>
        <Button type="submit" className="submit-form">
          {loading ? (
            <i
              className="pi pi-spin pi-spinner"
              style={{ fontSize: "1em" }}
            ></i>
          ) : (
            "Ingresar"
          )}
        </Button>
      </form>
    </div>
  );
}
