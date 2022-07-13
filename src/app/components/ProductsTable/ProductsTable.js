import React, { useState, useEffect } from "react";
import "./ProductsTable.css";
import { toast } from "react-toastify";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../api/products";

export default function ProductsTable() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts(0).then((data) => {
      setProducts(data);
    });
  }, []);

  const onRowEditSave = async (product) => {
    await updateProduct(product);
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
    <div>
      <DataTable
        value={products}
        paginator={true}
        rows={10}
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
        <Column field="stock" header="Stock" editor={numberEditor} />
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
    </div>
  );
}
