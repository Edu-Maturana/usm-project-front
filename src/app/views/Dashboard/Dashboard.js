import React from "react";
import "./Dashboard.css";
import ProductsTable from "../../components/ProductsTable/ProductsTable";
import { Button } from "primereact/button";
import { removeToken } from "../../api/token";

export default function Dashboard() {
  const backToShop = () => {
    window.location.href = "/";
  };

  const logout = () => {
    removeToken();
    window.location.href = "/";
  };

  return (
    <div>
      <div className="DashboardHeader">
        <h1>Panel de control</h1>
        <div className="dashboardButtons">
          <Button
            className="p-button-outlined"
            label="Volver a la tienda"
            icon="pi pi-arrow-left"
            onClick={backToShop}
          ></Button>
          <Button
            className="p-button-outlined p-button-secondary"
            label="Cerrar sesión"
            icon="pi pi-sign-out"
            onClick={logout}
          ></Button>
        </div>
      </div>
      <ProductsTable />
    </div>
  );
}
