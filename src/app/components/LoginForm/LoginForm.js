import React, { useState } from "react";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import useAuth from "../../hooks/useAuth";
import { LogIn } from "../../api/auth";

import "./LoginForm.css";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  return (
    <div className="Login">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          LogIn({
            email: values.email,
            password: values.password,
          })
            .then((res) => {
              setLoading(true);
              login(res.token);
              setTimeout(() => {
                window.location.href = "/dashboard";
              }, 1000);
              setSubmitting(false);
            })
            .catch((err) => {
              toast.error("Nombre de usuario o contraseña incorrectos");
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form className="login-form">
            <h2 className="title">Iniciar sesión</h2>
            <div className="form-group">
              <label className="Label">Email</label>
              <InputText type="email" name="email" className="Input" />
            </div>
            <div className="form-group">
              <label className="Label">Contraseña</label>
              <InputText type="password" name="password" className="Input" />
            </div>
            <Button
              type="submit"
              loading={loading}
              className="submit-form"
              disabled={isSubmitting}
            >
              {loading ? (
                <i
                  className="pi pi-spin pi-spinner"
                  style={{ fontSize: "1.5em" }}
                ></i>
              ) : (
                "Ingresar"
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
