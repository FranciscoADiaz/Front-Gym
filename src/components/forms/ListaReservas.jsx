import React, { useEffect, useState, useCallback } from "react";
import { obtenerReservas, cancelarReserva } from "../../helpers/apiReservas";
import Swal from "sweetalert2";
import "./FormularioReserva.css";
import { Row, Col, Container, Button } from "react-bootstrap";

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
      const reservasData = response.data || response;
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
    <Container>
      <h3 className="text-center mb-4">Mis Reservas</h3>

      {reservas.length === 0 ? (
        <div className="text-center text-muted">
          <p>No tienes reservas activas</p>
        </div>
      ) : (
        <ul className="lista-reservas p-0">
          {reservas.map((reserva) => (
            <li
              key={reserva._id}
              className="mb-3 list-group-item border shadow-sm rounded"
            >
              <Row className="w-100">
                <Col xs={12} sm={5} className="mb-2 mb-sm-0">
                  <strong>{reserva.tipoClase}</strong>
                  <br />
                  {reserva.fecha.slice(0, 10)} a las {reserva.hora}
                </Col>

                <Col xs={12} sm={4} className="mb-2 mb-sm-0">
                  Profesor/a: {reserva.profesor}
                </Col>

                <Col xs={12} sm={3}>
                  <Button
                    variant="danger"
                    onClick={() => cancelar(reserva._id)}
                    className="w-100"
                  >
                    Cancelar
                  </Button>
                </Col>
              </Row>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
};

export default ListaReservas;
