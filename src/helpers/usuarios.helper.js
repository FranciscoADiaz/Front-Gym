import clientAxios from "./axios.config.helper";

export const obtenerUsuarios = async () => {
  const token = JSON.parse(sessionStorage.getItem("token"));

  const res = await clientAxios.get("/usuarios", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.usuarios;
};


export const eliminarUsuario = async (id) => {
  const token = JSON.parse(sessionStorage.getItem("token"));

  return clientAxios.delete(`/usuarios/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const habilitarDeshabilitarUsuario = async (id) => {
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
