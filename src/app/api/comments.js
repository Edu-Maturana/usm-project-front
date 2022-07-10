import axios from "axios";

const apiUrl = 'http://localhost:8080/api/v1';

export const getLastComments = async (id) => {
    const response = await axios.get(`${apiUrl}/comments/last/${id}`);
    console.log(response.data); 
    return response.data;
}