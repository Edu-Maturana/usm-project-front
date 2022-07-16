import React, { useState } from "react";
import { useFormik } from "formik";
import "./OrderForm.css";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Checkbox } from "primereact/checkbox";

import buildMessage from "../../api/whatsapp";
import { saveUserData } from "../../api/user";

export default function OrderForm() {
  const [formData, setFormData] = useState({});
  const message = JSON.parse(localStorage.getItem("message"));
  const whatsAppUrl = "https://wa.me/56935299088?text=";

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.name) {
        errors.name = "El nombre es requerido";
      }

      if (!values.address) {
        errors.address = "La dirección es requerida";
      }

      return errors;
    },
    onSubmit: (values) => {
      setFormData(values);
      setTimeout(() => {
        window.open(
          whatsAppUrl +
            buildMessage(
              values.name,
              values.address,
              message.products,
              message.totalPrice
            )
        );
        localStorage.removeItem("message");
        localStorage.removeItem("cart");
      }, 500);
    },
  });

  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  const saveData = (value) => {
    if (value) {
      saveUserData(formik.values.name, formik.values.address);
    }
  };

  return (
    <form className="LoginForm" onSubmit={formik.handleSubmit}>
      <div className="Login-container">
        <h3>Ingresa tus datos</h3>
        {getFormErrorMessage("name")}
        <InputText
          placeholder="Nombre"
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          autoFocus
          className={classNames({ "p-invalid": isFormFieldValid("name") })}
        />
        {getFormErrorMessage("address")}
        <InputText
          placeholder="Dirección"
          id="address"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          autoFocus
          className={classNames({ "p-invalid": isFormFieldValid("address") })}
        />
        <div className="field-checkbox saveData">
          <Checkbox
            inputId="saveData"
            name="saveData"
            checked={formik.values.saveData}
            onChange={(e) => {
              saveData(e.checked);
              formik.setFieldValue("saveData", e.checked);
            }}
          />
          <label htmlFor="saveData"> Guardar datos para futuras compras</label>
        </div>
        <Button type="submit" label="Hacer pedido" />
      </div>
    </form>
  );
}
