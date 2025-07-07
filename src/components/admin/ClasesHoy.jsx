import { Card } from "react-bootstrap";

const ClasesHoy = ({ clase }) => {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>
          {clase.tipoClase} ({clase.profesor})
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {new Date(clase.fecha).toLocaleDateString("es-AR")} a las {clase.hora}
        </Card.Subtitle>
        <Card.Text>
          <strong>Usuarios anotados:</strong>
          <ul>
            {clase.usuarios.map((usuario, i) => (
              <li key={i}>{usuario.nombreUsuario}</li>
            ))}
          </ul>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ClasesHoy;
