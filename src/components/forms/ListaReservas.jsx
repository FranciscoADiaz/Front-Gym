import React, { useEffect, useState } from "react";

import { obtenerReservas, cancelarReserva, crearReserva } from "../../helpers/apiReservas";
import Swal from "sweetalert2";
import "./FormularioReserva.css"; 

const ListaReservas = () => {
  const [reservas, setReservas] = useState([]);

  const cargarReservas = async () => {
    const { data } = await obtenerReservas();
    setReservas(data);
  };

  useEffect(() => {
    cargarReservas();
  }, []);

  const cancelar = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Cancelar reserva?",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    });

    if (confirm.isConfirmed) {
      await cancelarReserva(id);
      Swal.fire("Cancelado", "", "success");
      cargarReservas();
    }
  };

  return (
    <div className="lista-reservas">
      <h2>Reservas actuales</h2>
      <ul>
        {reservas.map((reserva) => (
          <li key={reserva._id}>
            <strong>{reserva.nombreUsuario}</strong> – {reserva.tipoClase} –{" "}
            {reserva.fecha.slice(0, 10)} a las {reserva.hora}
            <button onClick={() => cancelar(reserva._id)}>Cancelar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaReservas;
