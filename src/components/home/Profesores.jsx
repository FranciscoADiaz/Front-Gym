import { Container, Row, Col, Card } from "react-bootstrap";
import "./Componentes.css";

const listaProfes = [
  {
    nombre: "Walter Rivas",
    especialidad: "Musculación",
    turno: "Mañana",

    url: "https://res.cloudinary.com/dpy5kwico/image/upload/v1754950151/profe2_lbcacy.avif",
  },
  {
    nombre: "Daniela Cardozo",
    especialidad: "Funcional",
    turno: "Tarde",
    url: "https://res.cloudinary.com/dpy5kwico/image/upload/v1754950152/profe3_gavkie.webp",
  },
  {
    nombre: "Andrés Perlo",
    especialidad: "Zumba",
    turno: "Noche",
    url: "https://res.cloudinary.com/dpy5kwico/image/upload/v1754950150/profe1_vg2ake.webp",
  },
];

const Profesores = () => {
  return (
    <section className="padding-vertical section-neutral-soft text-dark">
      <Container>
        <h2 className="text-center mb-4">PROFESORES</h2>

        <Row className="g-4 justify-content-center">
          {listaProfes.map((profe, i) => (
            <Col key={i} xs={12} sm={6} md={4}>
              <Card className="h-100 text-center bg-white text-dark shadow-sm border-0 card-hover borde-card">
                <img
                  src={profe.url}
                  alt={profe.nombre}
                  loading="lazy"
                  className="img-circular"
                  style={{
                    width: 180,
                    height: 180,
                    objectFit: "cover",
                    display: "block",
                    margin: "20px auto 0",
                  }}
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
