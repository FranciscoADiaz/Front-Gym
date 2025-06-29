import React, { useState } from "react";
import clientAxios from "../../helpers/axios.config.helper";
import Swal from "sweetalert2";
import "./FormularioReserva.css"; 

const FormularioReserva = () => {
  const [reserva, setReserva] = useState({
    nombreUsuario: "",
    fecha: "",
    hora: "",
    tipoClase: "",
  });

  const handleChange = (e) => {
    setReserva({ ...reserva, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await clientAxios.post("/reservas", reserva); 
      Swal.fire("✅ Turno reservado", "", "success");
      setReserva({ nombreUsuario: "", fecha: "", hora: "", tipoClase: "" });
    } catch (error) {
      Swal.fire(
        "❌ Error",
        error.response?.data?.msg || "Algo salió mal",
        "error"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reserva-form">
      <h2>Reservar</h2>
      <input
        type="text"
        name="nombreUsuario"
        value={reserva.nombreUsuario}
        onChange={handleChange}
        placeholder="Tu nombre"
        required
      />
      <input
        type="date"
        name="fecha"
        value={reserva.fecha}
        onChange={handleChange}
        required
      />
      <input
        type="time"
        name="hora"
        value={reserva.hora}
        onChange={handleChange}
        required
      />
      <select
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
