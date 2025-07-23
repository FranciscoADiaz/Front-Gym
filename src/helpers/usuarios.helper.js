import clientAxios, { configHeaders } from "./axios.config.helper";


export const obtenerUsuarios = async () => {
  const res = await clientAxios.get("/usuarios", configHeaders());
  return res.data.usuarios;
};


export const eliminarUsuario = async (id) => {
  return clientAxios.delete(`/usuarios/${id}`, configHeaders());
};

export const habilitarDeshabilitarUsuario = async (id) => {
  return clientAxios.put(`/usuarios/enableDisable/${id}`, {}, configHeaders());
};
