import React from "react";
import "./Auth.css";
import { TabView, TabPanel } from "primereact/tabview";

import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import Footer from "../../components/Footer/Footer";

export default function Auth() {
  return (
    <div className="Auth">
      <TabView>
        <TabPanel header="Iniciar sesión">
          <LoginForm />
        </TabPanel>
        <TabPanel header="Registrar Admin">
          <RegisterForm />
        </TabPanel>
      </TabView>
      <Footer />
    </div>
  );
}
