import { Container, Row, Col, Card } from "react-bootstrap";
import profe1 from "../../assets/profe1.webp";
import profe2 from "../../assets/profe2.avif";
import profe3 from "../../assets/profe3.webp";

const listaProfes = [
  {
    nombre: "Walter Rivas",
    especialidad: "Musculación",
    turno: "Mañana",
    imagen: profe2,
  },
  {
    nombre: "Daniela Cardozo",
    especialidad: "Funcional",
    turno: "Tarde",
    imagen: profe3,
  },
  {
    nombre: "Andrés Perlo",
    especialidad: "Zumba",
    turno: "Noche",
    imagen: profe1,
  },
];

const Profesores = () => {
  return (
    <section className="py-5 bg-light">
      <Container>
        <h2 className="text-center mb-4">Nuestro equipo de profesores</h2>
        <Row className="g-4 justify-content-center">
          {listaProfes.map((profe, i) => (
            <Col key={i} xs={12} sm={6} md={4}>
              <Card className="h-100 text-center shadow-sm border-0 card-hover">
                <Card.Img
                  variant="top"
                  src={profe.imagen}
                  alt={profe.nombre}
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{profe.nombre}</Card.Title>
                  <Card.Text>
                    <strong>Especialidad:</strong> {profe.especialidad} <br />
                    <strong>Turno:</strong> {profe.turno}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Profesores;
