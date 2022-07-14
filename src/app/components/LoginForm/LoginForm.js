import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";

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
              login(res.token);
              setTimeout(() => {
                setLoading(true);
                window.location.href = "/dashboard";
              }, 1000);
              setSubmitting(false);
            })
            .catch((err) => {
              console.log(err);
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
              <Field type="email" name="email" className="Input" />
            </div>
            <div className="form-group">
              <label className="Label">Contraseña</label>
              <Field type="password" name="password" className="Input" />
            </div>
            <button
              type="submit"
              loading={loading}
              className="submit-form"
              disabled={isSubmitting}
            >
              {loading ? "..." : "Ingresar"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
