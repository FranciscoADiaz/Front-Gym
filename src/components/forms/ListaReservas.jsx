import React, { useEffect, useState, useCallback } from "react";
import {
  obtenerReservasUsuario,
  cancelarReserva,
} from "../../helpers/apiReservas";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const ListaReservas = () => {
  const navigate = useNavigate();
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
  const [loading, setLoading] = useState(true);

  const cargarReservas = useCallback(async () => {
    if (!usuarioActual) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await obtenerReservasUsuario(usuarioActual);

      const reservasData = response.data?.reservas || response.data || [];

      if (!Array.isArray(reservasData)) {
        setReservas([]);
        return;
      }

      setReservas(reservasData);
    } catch (error) {
      if (error.response?.status === 401) {
        Swal.fire({
          title: "Sesión expirada",
          text: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
          icon: "warning",
          confirmButtonText: "Iniciar Sesión",
        }).then(() => {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("rol");
          navigate("/iniciarsesion");
        });
      }
      setReservas([]);
    } finally {
      setLoading(false);
    }
  }, [usuarioActual, navigate]);

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
      try {
        await cancelarReserva(id);
        Swal.fire("Clase cancelada con éxito", "", "success");
        cargarReservas();
      } catch {
        Swal.fire("Error", "No se pudo cancelar la clase", "error");
      }
    }
  };

  // Si no hay usuario logueado, mostrar mensaje
  if (!usuarioActual) {
    return (
      <div className="container-md mt-5">
        <div className="card reserva-card fade-in shadow-lg border-0">
          <div className="card-header reserva-card-header bg-gradient-secondary text-white text-center py-4">
            <h3 className="card-title mb-0 text-black">
              <i className="fas fa-list-alt reserva-icon"></i>
              Mis Reservas
            </h3>
          </div>
          <div className="card-body reserva-card-body p-4 text-center">
            <div className="empty-state">
              <div className="empty-state-icon">
                <i className="fas fa-user-lock text-muted"></i>
              </div>
              <h5 className="text-muted mb-2">Debes iniciar sesión</h5>
              <p className="text-muted small">
                Para ver tus reservas, necesitas iniciar sesión
              </p>
              <button
                className="btn btn-primary mt-3 btn-reserva"
                onClick={() => navigate("/iniciarsesion")}
              >
                Iniciar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-md mt-5">
      <div className="card reserva-card fade-in shadow-lg border-0">
        <div className="card-header reserva-card-header bg-gradient-secondary text-white text-center py-4">
          <h3 className="card-title mb-0 text-black">
            <i className="fas fa-list-alt reserva-icon"></i>
            Mis Reservas
          </h3>
        </div>

        <div className="card-body reserva-card-body p-4">
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="mt-3 text-muted">Cargando tus reservas...</p>
            </div>
          ) : reservas.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <i className="fas fa-calendar-times text-muted"></i>
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
                  className="card reserva-item hover-lift border-0 shadow-sm"
                  style={{ padding: "var(--spacing-lg)" }}
                >
                  <div className="d-flex flex-column align-items-center text-center">
                    <div className="mb-3">
                      <div className="d-flex align-items-center justify-content-center mb-2">
                        <i className="fas fa-dumbbell text-primary reserva-icon"></i>
                        <h4 className="mb-0">{reserva.tipoClase}</h4>
                      </div>
                      <div className="d-flex align-items-center justify-content-center mb-1">
                        <i className="fas fa-calendar text-secondary reserva-icon"></i>
                        <p className="text-secondary mb-0 reserva-text">
                          {reserva.fecha.slice(0, 10)} a las {reserva.hora}
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-center">
                        <i className="fas fa-user-tie text-muted reserva-icon"></i>
                        <p className="text-muted mb-0 reserva-text">
                          Profesor: {reserva.profesor}
                        </p>
                      </div>
                    </div>

                    <div className="w-full">
                      <button
                        onClick={() => cancelar(reserva._id)}
                        className="btn btn-danger btn-sm shadow-sm w-full btn-reserva"
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
