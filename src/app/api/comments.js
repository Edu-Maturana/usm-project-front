import axios from "axios";
import { config } from "../../config";
import { getToken } from "./token";

const apiUrl = config.apiUrl;

export const getLastComments = async (id) => {
  const response = await axios.get(`${apiUrl}/comments/last/${id}`);
  return response.data;
};

export const getAllComments = async (id) => {
  const response = await axios.get(`${apiUrl}/comments/${id}`);
  return response.data;
};

export const createComment = async (comment) => {
  const response = await axios.post(`${apiUrl}/comments`, {
    ...comment,
    product_id: Number(comment.product_id),
  });
  return response.data;
};

export const deleteComment = async (id) => {
  const response = await axios.delete(`${apiUrl}/comments/${id}`, {
    headers: {
      token: getToken(),
    },
  });
  return response.data;
};
