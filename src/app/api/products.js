import axios from "axios";

const apiUrl = "http://localhost:8080/api/v1";

export const getProducts = async (sort) => {
  const response = await axios.get(`${apiUrl}/products?priceSort=${sort}`);
  return response.data;
};

export const getProduct = async (id) => {
  const response = await axios.get(`${apiUrl}/products/${id}`);
  return response.data;
};

export const createProduct = async (product) => {
  const response = await axios.post(`${apiUrl}/products`, product);
  return response.data;
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
