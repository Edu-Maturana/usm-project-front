import axios from "axios";
import { config } from "../../config";
import { getToken } from "./token";

const apiUrl = config.apiUrl;

export const getProducts = async (sort, limit = 20) => {
  const response = await axios.get(
    `${apiUrl}/products?priceSort=${sort}&limit=${limit}`
  );
  return response.data;
};

export const getProduct = async (id) => {
  const response = await axios.get(`${apiUrl}/products/${id}`);
  return response.data;
};

export const createProduct = async (product) => {
  const response = await axios.post(
    `${apiUrl}/products`,
    {
      ...product,
      stock: Number(product.stock),
      price: Number(product.price),
    },
    {
      headers: {
        token: getToken(),
      },
    }
  );
  console.log(response.data);
};

export const updateProduct = async (product) => {
  const response = await axios.put(
    `${apiUrl}/products/${product.ID}`,
    {
      ...product,
      stock: Number(product.stock),
      price: Number(product.price),
    },
    {
      headers: {
        token: getToken(),
      },
    }
  );
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${apiUrl}/products/${id}`, {
    headers: {
      token: getToken(),
    },
  });
  return response.data;
};
