import axios from "axios";

const token = JSON.parse(sessionStorage.getItem("token")) || null;

const clientAxios = axios.create({
  baseURL: `${import.meta.env.VITE_URL_BACK_PROD}/api`,
});

export const configHeaders = {
  headers: {
    "Content-Type": "application/json",
    ...(token && { auth: `${token}` }),
  },
};

export const configHeadersImagen = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export default clientAxios;
