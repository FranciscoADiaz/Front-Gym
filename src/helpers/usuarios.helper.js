import clientAxios, { getAuthHeaders } from "./axios.config.helper";


export const obtenerUsuarios = async () => {
  const res = await clientAxios.get("/usuarios", getAuthHeaders());
  return res.data.usuarios;
};


export const eliminarUsuario = async (id) => {
  return clientAxios.delete(`/usuarios/${id}`, getAuthHeaders());
};

export const habilitarDeshabilitarUsuario = async (id) => {
  return clientAxios.put(`/usuarios/enableDisable/${id}`, {}, getAuthHeaders());
};
