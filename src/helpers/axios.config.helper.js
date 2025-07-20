import axios from "axios";

const clientAxios = axios.create({
  baseURL: `${import.meta.env.VITE_URL_BACK_PROD}/api`,
});


export const getConfigHeaders = () => {
  const tokenData = JSON.parse(sessionStorage.getItem("token"));
  const token = tokenData?.token || tokenData;

  return {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
};

export const configHeadersImagen = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export default clientAxios;
