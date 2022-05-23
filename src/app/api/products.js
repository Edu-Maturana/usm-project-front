import axios from "axios";

const apiUrl = 'http://localhost:8080/api/v1';

export const getProducts = async () => {
    const response = await axios.get(`${apiUrl}/products`);
    return response.data;
};

export const getProduct = async (id) => {
    const response = await axios.get(`${apiUrl}/products/${id}`);
    return response.data;
}