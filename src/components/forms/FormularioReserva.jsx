import React, { useState, useEffect } from "react";
import clientAxios from "../../helpers/axios.config.helper";
import Swal from "sweetalert2";

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

const definirHoraPorProfesor = (profesor) => {
  if (profesor === "andres") return "08:00";
  if (profesor === "walter") return "14:00";
  if (profesor === "daniela") return "20:00";
  return "";
};

const diasPermitidosPorProfesor = {
  andres: [1, 3], // lunes, miércoles
  walter: [2, 4], // martes, jueves
  daniela: [5, 6], // viernes, sábado
};

const esDiaPermitido = (profesor, fechaString) => {
  if (!profesor || !fechaString) return false;
  const fecha = new Date(fechaString);
  const dia = fecha.getDay();
  return diasPermitidosPorProfesor[profesor]?.includes(dia);
};

const FormularioReserva = () => {
  const idUsuario = obtenerIdUsuario();

  const [reserva, setReserva] = useState({
    fecha: "",
    tipoClase: "",
    profesor: "",
  });

  const [cuposDisponibles, setCuposDisponibles] = useState(0);
  const [planUsuario, setPlanUsuario] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setReserva({ ...reserva, [e.target.name]: e.target.value });
  };

  const generarFechasValidas = () => {
    if (!reserva.profesor) return [];

    const hoy = new Date();
    const fechas = [];
    for (let i = 0; i < 14; i++) {
      const fecha = new Date(hoy);
      fecha.setDate(hoy.getDate() + i);
      if (esDiaPermitido(reserva.profesor, fecha.toISOString().split("T")[0])) {
        fechas.push(fecha.toISOString().split("T")[0]);
      }
    }
    return fechas;
  };

  const fechasValidas = generarFechasValidas();

  // Verificar cupos disponibles y plan del usuario
  const verificarDisponibilidad = async (fecha, hora, tipoClase) => {
    try {
      const response = await clientAxios.get(
        `/reservar/cupos?fecha=${fecha}&hora=${hora}&tipoClase=${tipoClase}`
      );

      if (response.data && typeof response.data.cuposDisponibles === "number") {
        setCuposDisponibles(response.data.cuposDisponibles);
      } else if (response.data && typeof response.data.cupos === "number") {
        setCuposDisponibles(response.data.cupos);
      } else {
        setCuposDisponibles(10);
      }
    } catch (error) {
      setCuposDisponibles(10);
    }
  };

  const obtenerPlanUsuario = async () => {
    if (!idUsuario) return;
    try {
      const response = await clientAxios.get(
        `/usuarios/${idUsuario}/plan-activo`
      );

      if (response.data.planActivo) {
        setPlanUsuario(response.data.plan);
      } else {
        setPlanUsuario("Sin plan");
      }
    } catch (error) {
      setPlanUsuario("Sin plan");
    }
  };

  // Verificar disponibilidad cuando cambie la fecha
  useEffect(() => {
    if (reserva.fecha && reserva.profesor && reserva.tipoClase) {
      const hora = definirHoraPorProfesor(reserva.profesor);
      verificarDisponibilidad(reserva.fecha, hora, reserva.tipoClase);
    }
  }, [reserva.fecha, reserva.profesor, reserva.tipoClase]);

  // Obtener plan del usuario al cargar
  useEffect(() => {
    obtenerPlanUsuario();
  }, [idUsuario]);

  // Inicializar cupos con valor por defecto
  useEffect(() => {
    setCuposDisponibles(10); // Valor por defecto
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!idUsuario) {
      Swal.fire("❌ Error", "Debes iniciar sesión para reservar", "error");
      setLoading(false);
      return;
    }

    if (!planUsuario || planUsuario === "Sin plan") {
      Swal.fire(
        "❌ Plan requerido",
        "Necesitas un plan activo para reservar clases",
        "error"
      );
      setLoading(false);
      return;
    }

    // Verificar que el plan incluya clases
    const planesSoloMusculacion = ["Musculación", "SOLO MUSCULACIÓN"];
    if (planesSoloMusculacion.includes(planUsuario)) {
      Swal.fire(
        "❌ Plan no válido",
        "Tu plan solo incluye musculación, no clases",
        "error"
      );
      setLoading(false);
      return;
    }

    const hora = definirHoraPorProfesor(reserva.profesor);
    if (!hora) {
      Swal.fire("⚠️ Seleccioná un profesor válido", "", "warning");
      setLoading(false);
      return;
    }

    if (!esDiaPermitido(reserva.profesor, reserva.fecha)) {
      Swal.fire("❌ Día no válido", "Ese profesor no atiende ese día", "error");
      setLoading(false);
      return;
    }

    // Verificar cupos disponibles (comentado temporalmente)
    // if (cuposDisponibles <= 0) {
    //   Swal.fire(
    //     "❌ Sin cupos",
    //     "No hay cupos disponibles para esta clase",
    //     "error"
    //   );
    //   setLoading(false);
    //   return;
    // }

    try {
      await clientAxios.post("/reservar", {
        ...reserva,
        hora,
        idUsuario,
      });

      Swal.fire("✅ Turno reservado con éxito", "", "success");
      setReserva({ fecha: "", tipoClase: "", profesor: "" });
      setCuposDisponibles((prev) => prev - 1); // Actualizar cupos
    } catch (error) {
      Swal.fire(
        "❌ Error",
        error.response?.data?.msg || "Debes iniciar sesión para reservar",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-md">
      <div className="card reserva-card fade-in shadow-lg border-0">
        <div className="card-header reserva-card-header bg-gradient-primary text-white text-center py-4">
          <h2 className="card-title mb-0">
            <i className="fas fa-calendar-plus reserva-icon"></i>
            Reservar Clase
          </h2>
          <p className="mb-0 mt-2 opacity-75">Selecciona tu clase preferida</p>
        </div>

        <div className="card-body reserva-card-body p-4">
          {/* Información del plan del usuario */}
          {planUsuario && (
            <div
              className={`alert reserva-alert ${
                planUsuario === "Musculación" ? "alert-warning" : "alert-info"
              } mb-4 border-0 shadow-sm`}
            >
              <div className="d-flex align-items-center">
                <i
                  className={`fas reserva-icon ${
                    planUsuario === "Musculación"
                      ? "fa-exclamation-triangle"
                      : "fa-check-circle"
                  }`}
                ></i>
                <div className="reserva-text">
                  <strong>Tu plan actual:</strong> {planUsuario}
                  {planUsuario === "Musculación" && (
                    <div className="mt-1 small">
                      ⚠️ Este plan no incluye clases grupales
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Información de cupos */}
          {cuposDisponibles > 0 && (
            <div className="alert alert-success reserva-alert mb-4 border-0 shadow-sm">
              <div className="d-flex align-items-center">
                <i className="fas fa-users reserva-icon"></i>
                <div className="reserva-text">
                  <strong>Cupos disponibles:</strong> {cuposDisponibles}
                </div>
              </div>
            </div>
          )}
          {cuposDisponibles === 0 &&
            reserva.fecha &&
            reserva.tipoClase &&
            reserva.profesor && (
              <div className="alert alert-warning reserva-alert mb-4 border-0 shadow-sm">
                <div className="d-flex align-items-center">
                  <i className="fas fa-clock reserva-icon"></i>
                  <div className="reserva-text">
                    <strong>Verificando cupos disponibles...</strong>
                  </div>
                </div>
              </div>
            )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Tipo de clase */}
            <div className="form-group">
              <label htmlFor="tipoClase" className="form-label fw-bold">
                <i className="fas fa-dumbbell reserva-icon text-primary"></i>
                Tipo de clase
              </label>
              <select
                id="tipoClase"
                name="tipoClase"
                value={reserva.tipoClase}
                onChange={handleChange}
                className="form-control form-control-lg shadow-sm border-0"
                required
              >
                <option value="">Selecciona una clase</option>
                <option value="Spinning">🚴 Spinning</option>
                <option value="Funcional">💪 Funcional</option>
                <option value="Crossfit">🏋️ Crossfit</option>
              </select>
            </div>

            {/* Profesor */}
            <div className="form-group">
              <label htmlFor="profesor" className="form-label fw-bold">
                <i className="fas fa-user-tie reserva-icon text-primary"></i>
                Profesor
              </label>
              <select
                id="profesor"
                name="profesor"
                value={reserva.profesor}
                onChange={handleChange}
                className="form-control form-control-lg shadow-sm border-0"
                required
              >
                <option value="">Selecciona un profesor</option>
                <option value="andres">
                  👨‍🏫 Andrés (Lun y Mié - 08:00 a 10:00)
                </option>
                <option value="walter">
                  👨‍🏫 Walter (Mar y Jue - 14:00 a 16:00)
                </option>
                <option value="daniela">
                  👩‍🏫 Daniela (Vie y Sáb - 20:00 a 22:00)
                </option>
              </select>
            </div>

            {/* Fecha */}
            <div className="form-group">
              <label htmlFor="fecha" className="form-label fw-bold">
                <i className="fas fa-calendar-alt reserva-icon text-primary"></i>
                Fecha
              </label>
              <select
                id="fecha"
                name="fecha"
                value={reserva.fecha}
                onChange={handleChange}
                className="form-control form-control-lg shadow-sm border-0"
                required
                disabled={!reserva.profesor}
              >
                <option value="">Selecciona una fecha</option>
                {fechasValidas.map((fecha) => (
                  <option key={fecha} value={fecha}>
                    {new Date(fecha).toLocaleDateString("es-AR", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </option>
                ))}
              </select>
            </div>

            {/* Botón de reserva */}
            <div className="text-center mt-5">
              <button
                type="submit"
                className={`btn btn-primary btn-lg px-5 py-3 shadow-lg btn-reserva ${
                  loading ? "loading" : ""
                }`}
                disabled={
                  loading ||
                  !reserva.fecha ||
                  !reserva.tipoClase ||
                  !reserva.profesor ||
                  planUsuario === "Musculación"
                }
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin me-2"></i>
                    Reservando...
                  </>
                ) : (
                  <>
                    <i className="fas fa-calendar-check me-2"></i>
                    Reservar Clase
                  </>
                )}
              </button>
            </div>

            {/* Mensajes informativos */}
            {!reserva.fecha || !reserva.tipoClase || !reserva.profesor ? (
              <div className="alert alert-warning mt-4 reserva-alert border-0 shadow-sm text-center">
                <i className="fas fa-info-circle reserva-icon"></i>
                Completa todos los campos para habilitar la reserva
              </div>
            ) : planUsuario === "Musculación" ? (
              <div className="alert alert-error mt-4 reserva-alert border-0 shadow-sm text-center">
                <i className="fas fa-exclamation-triangle reserva-icon"></i>
                Tu plan de Musculación no incluye clases grupales
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioReserva;
