import axios from "axios";

// Creamos la instancia de Axios con la URL base
const clientAxios = axios.create({
  baseURL: `${import.meta.env.VITE_URL_BACK_PROD}/api`,
});


export const getAuthHeaders = () => {
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
