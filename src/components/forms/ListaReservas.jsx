import React, { useEffect, useState, useCallback } from "react";
import { obtenerReservas, cancelarReserva } from "../../helpers/apiReservas";
import Swal from "sweetalert2";

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
    try {
      console.log("Cargando reservas para usuario:", usuarioActual);
      const response = await obtenerReservas();
      console.log("Respuesta de reservas:", response);

      // Verificar la estructura de la respuesta
      const reservasData = response.data?.reservas || response.data || [];
      console.log("Datos de reservas:", reservasData);

      // Verificar que sea un array antes de filtrar
      if (!Array.isArray(reservasData)) {
        console.error("Error: reservasData no es un array:", reservasData);
        setReservas([]);
        return;
      }

      const reservasFiltradas = reservasData.filter(
        (reserva) => reserva.idUsuario === usuarioActual
      );
      console.log("Reservas filtradas:", reservasFiltradas);
      setReservas(reservasFiltradas);
    } catch (error) {
      console.error("Error al cargar reservas:", error);
      setReservas([]);
    }
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
    <div className="container-md mt-5">
      <div className="card fade-in shadow-lg border-0">
        <div className="card-header bg-gradient-secondary text-white text-center py-4">
          <h3 className="card-title mb-0 text-black">
            <i className="fas fa-list-alt me-2"></i>
            Mis Reservas
          </h3>
  
        </div>

        <div className="card-body p-4">
          {reservas.length === 0 ? (
            <div className="text-center p-5">
              <div className="mb-4">
                <i
                  className="fas fa-calendar-times text-muted"
                  style={{ fontSize: "4rem" }}
                ></i>
              </div>
              <h5 className="text-muted mb-2">No tienes reservas activas</h5>
              <p className="text-muted small">
                Reserva tu primera clase para comenzar tu entrenamiento
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {reservas.map((reserva) => (
                <div
                  key={reserva._id}
                  className="card hover-lift border-0 shadow-sm"
                  style={{ padding: "var(--spacing-lg)" }}
                >
                  <div className="d-flex flex-column align-items-center text-center">
                    <div className="mb-3">
                      <div className="d-flex align-items-center justify-content-center mb-2">
                        <i className="fas fa-dumbbell text-primary me-2"></i>
                        <h4 className="mb-0">{reserva.tipoClase}</h4>
                      </div>
                      <div className="d-flex align-items-center justify-content-center mb-1">
                        <i className="fas fa-calendar text-secondary me-2"></i>
                        <p className="text-secondary mb-0">
                          {reserva.fecha.slice(0, 10)} a las {reserva.hora}
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-center">
                        <i className="fas fa-user-tie text-muted me-2"></i>
                        <p className="text-muted mb-0">
                          Profesor: {reserva.profesor}
                        </p>
                      </div>
                    </div>

                    <div className="w-full">
                      <button
                        onClick={() => cancelar(reserva._id)}
                        className="btn btn-danger btn-sm shadow-sm w-full"
                      >
                        <i className="fas fa-times me-1"></i>
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListaReservas;
