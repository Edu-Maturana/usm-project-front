import React, { useState, useEffect } from "react";
import "./ProductsTable.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

import { getProducts } from "../../api/products";

export default function ProductsTable() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts(0).then((data) => {
      setProducts(data);
    });
  }, []);

  const columns = [
    {
      field: "ID",
      header: "ID",
    },
    {
      field: "name",
      header: "Nombre",
    },
    {
      field: "description",
      header: "Descripción",
    },
    {
      field: "image",
      header: "Imagen",
    },
    {
      field: "stock",
      header: "Stock",
    },
    {
      field: "price",
      header: "Precio",
    },
  ];

  return (
    <div>
      <DataTable value={products} paginator={true} rows={10}>
        {columns.map((column) => (
          <Column
            key={column.field}
            field={column.field}
            header={column.header}
          />
        ))}
      </DataTable>
    </div>
  );
}
