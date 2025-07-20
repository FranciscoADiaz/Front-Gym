import clientAxios from "./axios.config.helper";


export const eliminarUsuario = async (id) => {
  const token = JSON.parse(sessionStorage.getItem("token"));

  return clientAxios.delete(`/usuarios/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const toggleUsuario = async (id) => {
  const token = JSON.parse(sessionStorage.getItem("token"));

  return clientAxios.put(
    `/usuarios/enableDisable/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
