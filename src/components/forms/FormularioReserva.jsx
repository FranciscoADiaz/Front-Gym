import React, { useState, useEffect } from "react";
import clientAxios from "../../helpers/axios.config.helper";
import Swal from "sweetalert2";

import { getIdUsuario } from "../../helpers/auth.helper";

// Horarios desde backend (evita duplicar reglas en FE)
const obtenerHorarios = async () => {
  const res = await clientAxios.get("/reservar/profesores-horarios");
  return res.data?.data || {};
};

const definirHoraPorProfesor = (profesor, horarios) => {
  return horarios?.[profesor]?.hora || "";
};

// Convierte 'YYYY-MM-DD' a Date local sin cambiar de día por zona horaria
const parseLocalDateFromYMD = (ymd) => {
  if (typeof ymd !== "string") return null;
  const [y, m, d] = ymd.split("-").map((v) => parseInt(v, 10));
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
};

const formatLocalYMD = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const esDiaPermitido = (profesor, fechaString, horarios) => {
  if (!profesor || !fechaString) return false;
  const fecha = parseLocalDateFromYMD(fechaString);
  if (!fecha) return false;
  const dia = fecha.getDay();
  return Array.isArray(horarios?.[profesor]?.dias)
    ? horarios[profesor].dias.includes(dia)
    : false;
};

const FormularioReserva = ({ onReservada }) => {
  const idUsuario = getIdUsuario();

  const [reserva, setReserva] = useState({
    fecha: "",
    tipoClase: "",
    profesor: "",
  });

  const [cuposDisponibles, setCuposDisponibles] = useState(0);
  const [planUsuario, setPlanUsuario] = useState(null);
  const [loading, setLoading] = useState(false);
  const [horarios, setHorarios] = useState(null);

  useEffect(() => {
    (async () => {
      const h = await obtenerHorarios();
      setHorarios(h);
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "profesor") {
      // Resetear fecha si cambia el profesor para evitar inconsistencias
      setReserva({ ...reserva, profesor: value, fecha: "" });
    } else if (name === "fecha") {
      // Validar inmediatamente que la fecha coincida con los días del profesor
      if (
        reserva.profesor &&
        !esDiaPermitido(reserva.profesor, value, horarios)
      ) {
        Swal.fire(
          "⚠️ Día no válido",
          "El profesor seleccionado no trabaja ese día.",
          "warning"
        );
        setReserva({ ...reserva, fecha: "" });
      } else {
        setReserva({ ...reserva, fecha: value });
      }
    } else {
      setReserva({ ...reserva, [name]: value });
    }
  };

  const [fechasValidas, setFechasValidas] = useState([]);

  useEffect(() => {
    if (!reserva.profesor || !horarios) {
      setFechasValidas([]);
      return;
    }

    const diasPermitidos = horarios?.[reserva.profesor]?.dias || [];
    if (!Array.isArray(diasPermitidos) || diasPermitidos.length === 0) {
      setFechasValidas([]);
      return;
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const fechas = [];
    let cursor = new Date(hoy);
    for (let i = 0; i < 21; i++) {
      const dow = cursor.getDay();
      if (diasPermitidos.includes(dow)) {
        fechas.push(formatLocalYMD(cursor));
      }
      cursor.setDate(cursor.getDate() + 1);
    }

    setFechasValidas(fechas);
  }, [reserva.profesor, horarios]);

  const opcionesFecha = fechasValidas;
  const diasPermitidosActuales = horarios?.[reserva.profesor]?.dias || [];

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
    if (
      reserva.fecha &&
      reserva.profesor &&
      reserva.tipoClase &&
      horarios &&
      fechasValidas.includes(reserva.fecha)
    ) {
      const hora = definirHoraPorProfesor(reserva.profesor, horarios);
      verificarDisponibilidad(reserva.fecha, hora, reserva.tipoClase);
    }
  }, [
    reserva.fecha,
    reserva.profesor,
    reserva.tipoClase,
    horarios,
    fechasValidas,
  ]);

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

    const hora = definirHoraPorProfesor(reserva.profesor, horarios);
    if (!hora) {
      Swal.fire("⚠️ Seleccioná un profesor válido", "", "warning");
      setLoading(false);
      return;
    }

    if (!esDiaPermitido(reserva.profesor, reserva.fecha, horarios)) {
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
      // preservar selección actual para refrescar cupos después
      const fechaSel = reserva.fecha;
      const tipoSel = reserva.tipoClase;
      const profesorSel = reserva.profesor;

      const res = await clientAxios.post("/reservar", {
        ...reserva,
        hora,
        idUsuario,
      });

      // Mensaje de éxito consistente con backend
      Swal.fire(
        "✅ Reserva creada con éxito",
        res.data?.msg || "Tu clase fue reservada correctamente.",
        "success"
      );

      // Refrescar cupos desde el backend para reflejar el nuevo estado
      await verificarDisponibilidad(fechaSel, hora, tipoSel);

      // Notificar a la página para refrescar la lista inmediatamente
      if (typeof onReservada === "function") {
        onReservada();
      }
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
          {reserva.fecha &&
            reserva.tipoClase &&
            reserva.profesor &&
            (cuposDisponibles > 0 ? (
              <div className="alert alert-success reserva-alert mb-4 border-0 shadow-sm">
                <div className="d-flex align-items-center">
                  <i className="fas fa-users reserva-icon"></i>
                  <div className="reserva-text">
                    <strong>Cupos disponibles:</strong> {cuposDisponibles}
                  </div>
                </div>
              </div>
            ) : (
              <div className="alert alert-danger reserva-alert mb-4 border-0 shadow-sm">
                <div className="d-flex align-items-center">
                  <i className="fas fa-ban reserva-icon"></i>
                  <div className="reserva-text">
                    <strong>Sin cupos para esta clase y horario.</strong>{" "}
                    Seleccioná otra fecha.
                  </div>
                </div>
              </div>
            ))}

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
              {reserva.profesor && diasPermitidosActuales.length > 0 && (
                <div className="mt-2 text-muted small">
                  Días disponibles:{" "}
                  {diasPermitidosActuales.includes(1) ? "Lun " : ""}
                  {diasPermitidosActuales.includes(2) ? "Mar " : ""}
                  {diasPermitidosActuales.includes(3) ? "Mié " : ""}
                  {diasPermitidosActuales.includes(4) ? "Jue " : ""}
                  {diasPermitidosActuales.includes(5) ? "Vie " : ""}
                  {diasPermitidosActuales.includes(6) ? "Sáb " : ""}
                  {diasPermitidosActuales.includes(0) ? "Dom " : ""}
                </div>
              )}
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
                {opcionesFecha.map((fecha) => (
                  <option key={fecha} value={fecha}>
                    {parseLocalDateFromYMD(fecha).toLocaleDateString("es-AR", {
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
                  planUsuario === "Musculación" ||
                  cuposDisponibles <= 0
                }
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin me-2"></i>
                    Reservando...
                  </>
                ) : cuposDisponibles <= 0 ? (
                  <>
                    <i className="fas fa-ban me-2"></i>
                    Sin cupos
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
