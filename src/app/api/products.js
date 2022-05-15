import axios from "axios";

const apiUrl = 'http://localhost:3000/api/v1';

export const getProducts = async () => {
    const response = await axios.get(`${apiUrl}/products`);
    return response.data;
};
