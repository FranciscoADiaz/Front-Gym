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

export const crearUsuario = async (usuarioData) => {
  return clientAxios.post("/usuarios/crear", usuarioData, configHeaders());
};

export const actualizarUsuario = async (id, usuarioData) => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("No hay token de autorización");
    }

    const response = await clientAxios.put(`/usuarios/${id}`, usuarioData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    return response;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("Error de autenticación. Verifica que seas admin.");
    } else if (error.response?.status === 400) {
      throw new Error("Error en los datos: " + error.response.data.msg);
    } else if (error.response?.status === 500) {
      throw new Error(
        "Error interno del servidor: " +
          (error.response.data?.msg || "Error 500")
      );
    } else {
      throw new Error("Error al actualizar usuario: " + error.message);
    }
  }
};

export const asignarPlanUsuario = async (idUsuario, planData) => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("No hay token de autorización");
    }

    const response = await clientAxios.post(
      `/usuarios/${idUsuario}/asignar-plan`,
      planData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      }
    );

    return response;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("Error de autenticación. Verifica que seas admin.");
    } else if (error.response?.status === 400) {
      throw new Error("Error en los datos: " + error.response.data.msg);
    } else if (error.response?.status === 404) {
      throw new Error("Usuario no encontrado");
    } else if (error.response?.status === 500) {
      throw new Error(
        "Error interno del servidor: " +
          (error.response.data?.msg || "Error 500")
      );
    } else {
      throw new Error("Error al asignar plan: " + error.message);
    }
  }
};
