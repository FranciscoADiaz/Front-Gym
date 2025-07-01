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

const FormularioReserva = () => {
  const idUsuario = obtenerIdUsuario();


  const [reserva, setReserva] = useState({
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
      await clientAxios.post("/reservar", { ...reserva, idUsuario });
      Swal.fire("✅ Turno reservado con éxito", "", "success");
      setReserva({ fecha: "", hora: "", tipoClase: "" });
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
                <option value="andres">Andrés</option>
                <option value="walter">Walter</option>
                <option value="daniela">Daniela</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="fecha" className="mb-3">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                name="fecha"
                value={reserva.fecha}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="hora" className="mb-4">
              <Form.Label>Hora</Form.Label>
              <Form.Control
                type="time"
                name="hora"
                value={reserva.hora}
                onChange={handleChange}
                required
              />
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
