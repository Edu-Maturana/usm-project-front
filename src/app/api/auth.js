import axios from "axios";
import { config } from "../../config";

export const LogIn = async (user) => {
  const response = await axios.post(config.apiUrl, user);
  return response.data;
};
