import React, { useState, useEffect } from "react";
import "./ProductsTable.css";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../api/products";
import { Dialog } from "primereact/dialog";

export default function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);

  useEffect(() => {
    getProducts(0).then((data) => {
      setProducts(data);
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      image: "",
      stock: "",
      price: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.name) {
        errors.name = "El nombre es requerido";
      }

      if (!values.description) {
        errors.description = "La descripción es requerida";
      }

      if (!values.image) {
        errors.image = "La imagen es requerida";
      }

      if (!values.stock || values.stock < 0 || isNaN(values.stock)) {
        errors.stock = "El stock es requerido";
      }

      if (!values.price || values.price < 0 || isNaN(values.price)) {
        errors.price = "El precio es requerido";
      }

      return errors;
    },
    onSubmit: async (values) => {
      await createProduct(values);
      setDisplayForm(false);
      await getProducts(0).then((data) => {
        setProducts(data);
      });
      toast.success("Producto creado");
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

  const onRowEditSave = async (product) => {
    await updateProduct(product);
    toast.success("Producto actualizado");
    getProducts(0).then((data) => {
      setProducts(data);
    });
  };

  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        className="textEditor"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const numberEditor = (options) => {
    return (
      <InputText
        type="number"
        className="numberEditor"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const longTextEditor = (options) => {
    return (
      <InputText
        type="textarea"
        className="longTextEditor"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const descriptionTemplate = (rowData) => {
    return (
      <div>
        {rowData.description.substring(0, 50)}
        {rowData.description.length > 100 && "..."}
      </div>
    );
  };

  const imageTemplate = (product) => {
    return <img src={product.image} alt="product" />;
  };

  const stockTemplate = (product) => {
    if (product.stock == 100) {
      return <p>0</p>;
    }

    return <p>{product.stock}</p>;
  };

  const priceTemplate = (product) => {
    return `$${product.price}`;
  };

  const deleteTemplate = (product) => {
    return (
      <Button
        className="p-button-rounded p-button-text"
        icon="pi pi-trash"
        onClick={() => confirmDeletion(product)}
      />
    );
  };

  const confirmDeletion = (product) => {
    confirmDialog({
      message: "Está seguro(a) que desea eliminar el producto?",
      header: "Eliminar producto",
      icon: "pi pi-exclamation-triangle",
      accept: () => deleteTableProduct(product.ID),
    });
  };

  const deleteTableProduct = async (id) => {
    await deleteProduct(id);
    toast.success("Producto eliminado");
    getProducts(0).then((data) => {
      setProducts(data);
    });
  };

  return (
    <div className="ProductsTable">
      <div className="ProductsTableHeader">
        <Button
          label="Nuevo producto"
          icon="pi pi-plus"
          className="newProduct"
          onClick={() => setDisplayForm(true)}
        />
      </div>
      <DataTable
        value={products}
        paginator={true}
        rows={5}
        editMode="row"
        className="productsTable"
        onRowEditComplete={(e) => onRowEditSave(e.newData)}
        responsiveLayout="scroll"
      >
        <Column field="ID" header="ID" />
        <Column field="name" header="Nombre" editor={textEditor} />
        <Column
          field="description"
          header="Descripción"
          className="productsTableDescription"
          body={descriptionTemplate}
          editor={longTextEditor}
        />
        <Column
          field="image"
          header="Imagen"
          body={imageTemplate}
          className="productsTableImage"
          editor={textEditor}
        />
        <Column
          field="stock"
          header="Stock"
          body={stockTemplate}
          editor={numberEditor}
        />
        <Column
          field="price"
          header="Precio"
          body={priceTemplate}
          editor={numberEditor}
        />
        <Column rowEditor></Column>
        <Column body={deleteTemplate}></Column>
      </DataTable>
      <ConfirmDialog></ConfirmDialog>
      <Dialog
        header="Nuevo producto"
        visible={displayForm}
        modal={true}
        onHide={() => setDisplayForm(false)}
      >
        <form className="dialogForm" onSubmit={formik.handleSubmit}>
          <div className="dialogFormRow">
            <InputText
              placeholder="Nombre"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              autoFocus
              className={classNames({ "p-invalid": isFormFieldValid("name") })}
            />
            {getFormErrorMessage("name")}
          </div>
          <div className="dialogFormRow">
            <InputTextarea
              placeholder="Descripción"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              className={classNames({
                "p-invalid": isFormFieldValid("description"),
              })}
            />
            {getFormErrorMessage("description")}
          </div>
          <div className="dialogFormRow">
            <InputText
              placeholder="Imagen (URL)"
              name="image"
              value={formik.values.image}
              onChange={formik.handleChange}
              className={classNames({ "p-invalid": isFormFieldValid("image") })}
            />
            {getFormErrorMessage("image")}
          </div>
          <div className="dialogFormRow">
            <InputText
              placeholder="Stock"
              name="stock"
              value={formik.values.stock}
              onChange={formik.handleChange}
              className={classNames({ "p-invalid": isFormFieldValid("stock") })}
            />
            {getFormErrorMessage("stock")}
          </div>
          <div className="dialogFormRow">
            <InputText
              placeholder="Precio"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              className={classNames({ "p-invalid": isFormFieldValid("price") })}
            />
            {getFormErrorMessage("price")}
          </div>
          <div className="dialogFormRow">
            <Button label="Guardar" />
          </div>
        </form>
      </Dialog>
    </div>
  );
}
