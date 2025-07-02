import React, { useState } from "react";
import clientAxios from "../../helpers/axios.config.helper";
import Swal from "sweetalert2";
import "./FormularioReserva.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

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


  const handleChange = (e) => {
    setReserva({ ...reserva, [e.target.name]: e.target.value });
  };

 
  const generarFechasValidas = () => {
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


  const handleSubmit = async (e) => {
    e.preventDefault();

    const hora = definirHoraPorProfesor(reserva.profesor);
    if (!hora) {
      Swal.fire("⚠️ Seleccioná un profesor válido", "", "warning");
      return;
    }

    if (!esDiaPermitido(reserva.profesor, reserva.fecha)) {
      Swal.fire("❌ Día no válido", "Ese profesor no atiende ese día", "error");
      return;
    }

    try {
      await clientAxios.post("/reservar", {
        ...reserva,
        hora,
        idUsuario,
      });

      Swal.fire("✅ Turno reservado con éxito", "", "success");
      setReserva({ fecha: "", tipoClase: "", profesor: "" });
    } catch (error) {
      Swal.fire(
        "❌ Error",
        error.response?.data?.msg || "Debes iniciar sesión para reservar",
        "error"
      );
    }
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <Form
            onSubmit={handleSubmit}
            className="p-4 border rounded shadow bg-light"
          >
            <h2 className="text-center mb-4">Reservar clase</h2>

            <Form.Group controlId="tipoClase" className="mb-3">
              <Form.Label>Tipo de clase</Form.Label>
              <Form.Select
                name="tipoClase"
                value={reserva.tipoClase}
                onChange={handleChange}
                required
              >
                <option value="">Elegir Clase</option>
                <option value="Spinning">Spinning</option>
                <option value="Funcional">Funcional</option>
                <option value="Crossfit">Crossfit</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="profesor" className="mb-3">
              <Form.Label>Profesor</Form.Label>
              <Form.Select
                name="profesor"
                value={reserva.profesor}
                onChange={handleChange}
                required
              >
                <option value="">Elegir Profesor</option>
                <option value="andres">
                  Andrés (Lun y Mié - 08:00 a 10:00)
                </option>
                <option value="walter">
                  Walter (Mar y Jue - 14:00 a 16:00)
                </option>
                <option value="daniela">
                  Daniela (Vie y Sáb - 20:00 a 22:00)
                </option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="fecha" className="mb-3">
              <Form.Label>Fecha</Form.Label>
              <Form.Select
                name="fecha"
                value={reserva.fecha}
                onChange={handleChange}
                required
                disabled={!reserva.profesor}
              >
                <option value="">Elegí una fecha</option>
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
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Reservar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FormularioReserva;
