import axios from "axios";
import { getToken } from "./token";

export const getUserData = () => {
  const token = getToken();
  if (token) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };
    return axios.get("http://localhost:8080/api/v1/auth/login");
  }
};

export const editAddress = (userAddress) => {
  const token = getToken();
  if (token) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };

    return axios.put(
        "http://localhost:8080/api/v1/auth/login",
      { address: userAddress },
      config
    );
  }
};

export const getOrders = () => {
  const token = getToken();
  if (token) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };
    return axios.get("http://localhost:8080/api/v1/auth/login");
  }
};
