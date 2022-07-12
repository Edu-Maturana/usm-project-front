import axios from "axios";

export const LogIn = async (user) => {
  const url = "http://localhost:8080/api/v1/auth/login";
  const response = await axios.post(url, user);
  return response.data;
};