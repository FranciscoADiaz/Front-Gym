import React, { useState } from "react";
import clientAxios from "../../helpers/axios.config.helper";
import Swal from "sweetalert2";
import "./FormularioReserva.css";

// Función para extraer el idUsuario del token (decodificación Base64)
const obtenerIdUsuario = () => {
  const token = JSON.parse(sessionStorage.getItem("token")) || null;
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.idUsuario;
  } catch (e) {
    console.error("Error decodificando token:", e);
    return null;
  }
};

const FormularioReserva = () => {
  const idUsuario = obtenerIdUsuario();

  // Estado sólo para los datos que necesita aportar el usuario
  const [reserva, setReserva] = useState({
    fecha: "",
    hora: "",
    tipoClase: "",
  });

  // Actualiza el campo que cambió
  const handleChange = (e) => {
    setReserva({ ...reserva, [e.target.name]: e.target.value });
  };

  // Envía la reserva junto con el idUsuario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await clientAxios.post("/reservar", { ...reserva, idUsuario });
      Swal.fire("✅ Turno reservado con éxito", "", "success");
      setReserva({ fecha: "", hora: "", tipoClase: "" });
    } catch (error) {
      Swal.fire(
        "❌ Error",
        error.response?.data?.msg || "No se pudo reservar el turno",
        "error"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reserva-form">
      <h2>Reservar clase</h2>

      <label htmlFor="fecha">Fecha</label>
      <input
        id="fecha"
        type="date"
        name="fecha"
        value={reserva.fecha}
        onChange={handleChange}
        required
      />

      <label htmlFor="hora">Hora</label>
      <input
        id="hora"
        type="time"
        name="hora"
        value={reserva.hora}
        onChange={handleChange}
        required
      />

      <label htmlFor="tipoClase">Tipo de clase</label>
      <select
        id="tipoClase"
        name="tipoClase"
        value={reserva.tipoClase}
        onChange={handleChange}
        required
      >
        <option value="">Seleccioná una clase</option>
        <option value="Spinning">Spinning</option>
        <option value="Funcional">Funcional</option>
        <option value="Crossfit">Crossfit</option>
      </select>

      <button type="submit">Reservar</button>
    </form>
  );
};

export default FormularioReserva;
