import axios from "axios";
import { getToken } from "./token";

const apiUrl = "http://localhost:8080/api/v1";

export const getProducts = async (sort, limit = 20) => {
  const response = await axios.get(`${apiUrl}/products?priceSort=${sort}&limit=${limit}`);
  return response.data;
};

export const getProduct = async (id) => {
  const response = await axios.get(`${apiUrl}/products/${id}`);
  return response.data;
};

export const createProduct = async (product) => {
  const token = getToken();
  const response = await axios.post(
    `${apiUrl}/products`,
    {
      ...product,
      stock: Number(product.stock),
      price: Number(product.price),
    },
    {
      headers: {
        token,
      },
    }
  );
  console.log(response.data);
};

export const updateProduct = async (product) => {
  const response = await axios.put(`${apiUrl}/products/${product.ID}`, {
    ...product,
    stock: Number(product.stock),
    price: Number(product.price),
  });
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${apiUrl}/products/${id}`);
  return response.data;
};
