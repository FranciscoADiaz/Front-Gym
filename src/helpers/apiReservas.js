import clientAxios from "./axios.config.helper";

export const obtenerReservas = () => clientAxios.get("/reservar");
export const cancelarReserva = (id) => clientAxios.delete(`/reservar/${id}`);
export const crearReserva = (datos) => clientAxios.post("/reservar", datos);