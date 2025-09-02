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

// Interceptor para agregar el token automáticamente a todas las peticiones
clientAxios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");

    if (token) {
      try {
        const parsedToken = JSON.parse(token);
        config.headers.Authorization = `Bearer ${parsedToken}`;
      } catch (error) {
        console.error("Error parsing token:", error);
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
