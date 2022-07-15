import axios from "axios";
import { getToken } from "./token";

const apiUrl = "http://localhost:8080/api/v1";

export const getLastComments = async (id) => {
  const response = await axios.get(`${apiUrl}/comments/last/${id}`);
  console.log(response.data);
  return response.data;
};

export const getAllComments = async (id) => {
  const response = await axios.get(`${apiUrl}/comments/${id}`);
  console.log(response.data);
  return response.data;
};

export const createComment = async (comment) => {
  const response = await axios.post(`${apiUrl}/comments`, {
    ...comment,
    product_id: Number(comment.product_id),
  });
  console.log(response.data);
  return response.data;
};

export const deleteComment = async (id) => {
  const response = await axios.delete(`${apiUrl}/comments/${id}`
    , {
      headers: {
        token: getToken(),
        }
      }
    );
  console.log(response.data);
  return response.data;
}

