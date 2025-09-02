import { Card } from "react-bootstrap";

const ClasesProximosDias = ({ clase }) => {
  return (
    <Card className="mb-3 shadow-sm border-secondary">
      <Card.Body className="p-4">
        <Card.Title className="text-secondary fw-bold fs-4 mb-3">
          🏋️ {clase.tipoClase} - Prof. {clase.profesor}
        </Card.Title>
        <Card.Subtitle className="mb-3 text-info fs-6">
          📅{" "}
          {new Date(clase.fecha).toLocaleDateString("es-AR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          a las ⏰ {clase.hora}
        </Card.Subtitle>
        <Card.Text className="text-dark">
          <strong className="text-success">
            👥 Usuarios anotados ({clase.usuarios.length}):
          </strong>
          <ul className="mt-2 list-unstyled">
            {clase.usuarios.map((usuario, i) => (
              <li key={i} className="mb-1 p-2 bg-light rounded">
                👤 {usuario.nombreUsuario}
              </li>
            ))}
          </ul>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ClasesProximosDias;

