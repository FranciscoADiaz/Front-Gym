import clientAxios from "./axios.config.helper";

export const obtenerReservas = () => clientAxios.get("/reservar");
export const obtenerReservasUsuario = (idUsuario) =>
  clientAxios.get(`/reservar/usuario/${idUsuario}`);
export const cancelarReserva = (id) => clientAxios.delete(`/reservar/${id}`);
export const crearReserva = (datos) => clientAxios.post("/reservar", datos);
