import axios from "axios";

// Detectar si estamos en desarrollo local o producción
const isDevelopment = import.meta.env.DEV;

// URL del backend según el entorno
const backendURL = isDevelopment
  ? import.meta.env.VITE_URL_BACK_LOCAL || "http://localhost:3005"
  : import.meta.env.VITE_URL_BACK_PROD;

const clientAxios = axios.create({
  baseURL: `${backendURL}/api`,
});



export const configHeaders = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));

  return {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
};

export const configHeadersImagen = () => {
  return {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
    },
  };
};

export default clientAxios;
