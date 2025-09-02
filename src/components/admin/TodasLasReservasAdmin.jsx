import { Card } from "react-bootstrap";

const TodasLasReservasAdmin = ({ reserva }) => {
  return (
    <Card className="mb-3 shadow-sm border-info">
      <Card.Body className="p-4">
        <Card.Title className="text-info fw-bold fs-4 mb-3">
          🏋️ {reserva.tipoClase} - Prof. {reserva.profesor}
        </Card.Title>
        <Card.Subtitle className="mb-3 text-primary fs-6">
          📅{" "}
          {new Date(reserva.fecha).toLocaleDateString("es-AR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          a las ⏰ {reserva.hora}
        </Card.Subtitle>
        <Card.Text className="text-dark">
          <strong className="text-success">
            👥 Usuarios anotados ({reserva.usuarios.length}):
          </strong>
          <ul className="mt-2 list-unstyled">
            {reserva.usuarios.map((usuario, i) => (
              <li key={i} className="mb-1 p-2 bg-light rounded">
                <div className="d-flex justify-content-between align-items-center">
                  <div>👤 {usuario.nombreUsuario}</div>
                  <small className="text-muted">
                    📧 {usuario.emailUsuario}
                  </small>
                </div>
              </li>
            ))}
          </ul>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TodasLasReservasAdmin;

