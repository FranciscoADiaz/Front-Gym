import axios from "axios";

const isDevelopment = import.meta.env.DEV;

const backendURL = isDevelopment
  ? import.meta.env.VITE_URL_BACK_LOCAL || "http://localhost:3005"
  : import.meta.env.VITE_URL_BACK_PROD || "https://back-gym.vercel.app";

const clientAxios = axios.create({
  baseURL: `${backendURL}/api`,
});

clientAxios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");

    if (token) {
      try {
        const parsedToken = JSON.parse(token);
        config.headers.Authorization = `Bearer ${parsedToken}`;
      } catch {
        // token inválido en storage: ignorar
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
