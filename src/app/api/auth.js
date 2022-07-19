import axios from "axios";
import { config } from "../../config";
import { getToken } from "./token";

export const LogIn = async (user) => {
  const response = await axios.post(`${config.apiUrl}/auth/login`, user);
  return response.data;
};

export const getAdmin = async (email) => {
  const response = await axios.get(`${config.apiUrl}/auth/admins/${email}`, {
    headers: {
      token: getToken(),
    },
  });
  return response.data;
};
