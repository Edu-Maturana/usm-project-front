import React from "react";
import "./Auth.css";

import LoginForm from "../../components/LoginForm/LoginForm";
import Footer from "../../components/Footer/Footer";

export default function Auth() {
  return (
    <div className="Auth">
      <LoginForm />
      <Footer />
    </div>
  );
}
