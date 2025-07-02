import React, { useEffect, useState, useCallback } from "react";
import { obtenerReservas, cancelarReserva } from "../../helpers/apiReservas";
import Swal from "sweetalert2";
import "./FormularioReserva.css";
import { Row, Col } from "react-bootstrap";

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
 <Container>
      <ul className="lista-reservas p-0">
        {reservas.map((reserva) => (
          <li
            key={reserva._id}
            className="mb-3 list-group-item border shadow-sm rounded"
          >
            <Row>
              <Col xs={12} sm={6} className="mb-2 mb-sm-0">
                <strong>{reserva.tipoClase}</strong>
                <br />
                {reserva.fecha.slice(0, 10)} a las {reserva.hora}
              </Col>

              <Col xs={12} sm={4} className="mb-2 mb-sm-0">
                Profesor/a: {reserva.profesor}
              </Col>

              <Col xs={12} sm={2}>
                <Button
                  variant="danger"
                  size="sm"
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
    </Container>
)
};

export default ListaReservas;
