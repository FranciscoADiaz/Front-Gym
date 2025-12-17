import clientAxios from "./axios.config.helper";

export const enviarConsultaContacto = async (payload) => {
  const { data } = await clientAxios.post("/contacto", payload);
  return data;
};

