import React, { useEffect, useState, useCallback } from "react";
import {
  obtenerReservasUsuario,
  cancelarReserva,
} from "../../helpers/apiReservas";
import { useNavigate } from "react-router";
import { getIdUsuario, clearSession } from "../../helpers/auth.helper";
import { showError, showSuccess, confirmAction } from "../../helpers/swal.helper";

const ListaReservas = ({ refreshKey = 0 }) => {
  const navigate = useNavigate();
  const usuarioActual = getIdUsuario();

  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0); // re-render para actualizar estados de tiempo

  // Utilidades de fecha/hora
  const parseReservaDateTime = (fechaStr, horaStr) => {
    try {
      const soloFecha = (fechaStr || "").slice(0, 10); // YYYY-MM-DD
      const hora = (horaStr || "00:00").padEnd(5, ":0");
      // Construir Date local "YYYY-MM-DDTHH:MM:SS"
      const inicio = new Date(`${soloFecha}T${hora}:00`);
      // Duración estándar 60 min (ajustable si se define por clase)
      const fin = new Date(inicio.getTime() + 60 * 60 * 1000);
      return { inicio, fin, soloFecha };
    } catch {
      return { inicio: null, fin: null, soloFecha: null };
    }
  };

  const getEstadoTemporal = (reserva) => {
    const ahora = new Date();
    const { inicio, fin, soloFecha } = parseReservaDateTime(
      reserva.fecha,
      reserva.hora
    );

    if (!inicio || !fin) return { estado: "proxima", badge: "secondary" };

    const hoy = new Date(
      ahora.getFullYear(),
      ahora.getMonth(),
      ahora.getDate()
    );
    const fechaReserva = new Date(
      parseInt(soloFecha.substring(0, 4), 10),
      parseInt(soloFecha.substring(5, 7), 10) - 1,
      parseInt(soloFecha.substring(8, 10), 10)
    );

    // Si la fecha es anterior a hoy, se considera pasada y no se muestra
    if (fechaReserva < hoy) return { estado: "pasada", badge: "light" };

    if (ahora < inicio) return { estado: "proxima", badge: "info" };
    if (ahora >= inicio && ahora <= fin)
      return { estado: "en_curso", badge: "success" };
    // Mismo día pero ya terminó
    return { estado: "finalizada", badge: "secondary" };
  };

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

      // Filtrar: ocultar reservaciones de días pasados
      const procesadas = reservasData.filter(
        (r) => getEstadoTemporal(r).estado !== "pasada"
      );
      setReservas(procesadas);
    } catch (error) {
      if (error.response?.status === 401) {
        showError(
          "Sesión expirada",
          "Tu sesión ha expirado. Por favor, inicia sesión nuevamente."
        ).then(() => {
          clearSession();
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
  }, [cargarReservas, refreshKey]);

  // Timer para refrescar indicadores (cada 60s)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(id);
  }, []);

  const cancelar = async (id) => {
    const confirm = await confirmAction(
      "Confirmar Cancelación",
      "",
      "Sí",
      "No"
    );

    if (confirm.isConfirmed) {
      try {
        await cancelarReserva(id);
        showSuccess("Clase cancelada con éxito", "");
        cargarReservas();
      } catch {
        showError("Error", "No se pudo cancelar la clase");
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
              {reservas.map((reserva) => {
                const estadoTemp = getEstadoTemporal(reserva);
                const puedeCancelar = estadoTemp.estado === "proxima";
                const textoEstado =
                  estadoTemp.estado === "proxima"
                    ? "Próxima"
                    : estadoTemp.estado === "en_curso"
                    ? "En curso"
                    : "Finalizada";
                return (
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
                          <span className={`badge bg-${estadoTemp.badge} ms-2`}>
                            {textoEstado}
                          </span>
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
                          disabled={!puedeCancelar}
                        >
                          <i className="fas fa-times me-1"></i>
                          {puedeCancelar ? "Cancelar" : "No disponible"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListaReservas;
