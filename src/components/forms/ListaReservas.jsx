import React, { useEffect, useState, useCallback } from "react";
import { obtenerReservas, cancelarReserva } from "../../helpers/apiReservas";
import Swal from "sweetalert2";
import "./FormularioReserva.css";

const ListaReservas = () => {
  const token = JSON.parse(sessionStorage.getItem("token")) || null;
  const usuarioActual = token
    ? (() => {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          return payload.idUsuario;
        } catch (e) {
          console.error("Error decodificando token:", e);
          return null;
        }
      })()
    : null;

  const [reservas, setReservas] = useState([]);

  const cargarReservas = useCallback(async () => {
    if (!usuarioActual) return;
    const { data } = await obtenerReservas();
    const reservasFiltradas = data.filter(
      (reserva) => reserva.idUsuario === usuarioActual
    );
    setReservas(reservasFiltradas);
  }, [usuarioActual]);


  useEffect(() => {
    cargarReservas();
  }, [cargarReservas]);


  const cancelar = async (id) => {
    const confirm = await Swal.fire({
      title: "Confirmar Cancelación",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    });

    if (confirm.isConfirmed) {
      await cancelarReserva(id);
      Swal.fire("Clase cancelada con éxito", "", "success");
      cargarReservas();
    }
  };

  return (
    <div className="lista-reservas">
      <h2>Mis reservas</h2>
      <ul>
        {reservas.map((reserva) => (
          <li key={reserva._id}>
            <strong>{reserva.tipoClase}</strong> – {reserva.fecha.slice(0, 10)}{" "}
            a las {reserva.hora}
            <button onClick={() => cancelar(reserva._id)}>Cancelar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaReservas;
