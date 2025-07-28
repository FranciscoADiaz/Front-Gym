import { Container, Row, Col, Card } from "react-bootstrap";
import accesorios from "../../assets/accesorios.jpg";
import ropa from "../../assets/ropadeportiva.jpg";
import suplementos from "../../assets/suplemento.jpeg";
import { Link } from "react-router";


const productos = [
  {
    titulo: "Suplementos y batidos",
    imagen: suplementos,
    descripcion:
      "Proteína, creatina, pre-entreno y batidos listos para consumir.",
    ruta: "/productos/suplementos",
  },
  {
    titulo: "Accesorios de entrenamiento",
    imagen: accesorios,
    descripcion: "Guantes, cinturones de fuerza, vendas, agarraderas y más.",
    ruta: "/productos/accesorios",
  },
  {
    titulo: "Botellas y ropa deportiva",
    imagen: ropa,
    descripcion:
      "Botellas térmicas, camisetas dry-fit, shorts y joggers cómodos.",
    ruta: "/productos/ropa",
  },
];

const Productos = () => {
  return (
    <section className="py-5 bg-light">
      <Container>
        <h2 className="text-center mb-4">Productos disponibles</h2>
        <Row className="g-4 justify-content-center">
          {productos.map((prod, i) => (
            <Col key={i} xs={12} sm={6} md={4}>
              <Link to={prod.ruta} className="text-decoration-none text-dark">
                <Card
                  className="h-100 text-center shadow-sm border-0 card-hover"
                  style={{ cursor: "pointer" }}
                >
                  <Card.Img
                    variant="top"
                    src={prod.imagen}
                    alt={prod.titulo}
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title className="mt-2">{prod.titulo}</Card.Title>
                    <Card.Text className="text-muted">
                      {prod.descripcion}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Productos;
