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
    // Obtener el token del sessionStorage (como está configurado en el frontend)
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("No hay token de autorización");
    }

    console.log("=== DEBUG ACTUALIZAR USUARIO ===");
    console.log("ID del usuario:", id);
    console.log("Datos a enviar:", usuarioData);
    console.log("Token:", token);
    console.log("Token parseado:", JSON.parse(token));

    const response = await clientAxios.put(`/usuarios/${id}`, usuarioData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    console.log("Respuesta del backend:", response.data);
    return response;
  } catch (error) {
    console.error("=== ERROR DETALLADO ===");
    console.error("Error completo:", error);
    console.error("Status:", error.response?.status);
    console.error("Data del error:", error.response?.data);
    console.error("Headers:", error.response?.headers);

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
