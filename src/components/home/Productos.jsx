import { Container, Row, Col, Card } from "react-bootstrap";
import accesorios from "../../assets/accesorios.jpg";
import ropa from "../../assets/ropadeportiva.jpg";
import suplementos from "../../assets/suplemento.jpeg";
import { Link } from "react-router";
import './Componentes.css';

const productos = [
  {
    titulo: "Suplementos",
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
    titulo: "Ropa deportiva",
    imagen: ropa,
    descripcion:
      "Camisetas dry-fit, shorts y joggers cómodos.",
    ruta: "/productos/ropa",
  },
];

const Productos = () => {
  return (
    <section className="bg-dark text-white padding-vertical">
      <Container>
        <h2 className="text-center mb-4">PRODUCTOS DISPONIBLES</h2>
        <Row className="g-4 justify-content-center">
          {productos.map((prod, i) => (
            <Col key={i} xs={10} sm={6} md={4}> 
              
  <Link to={prod.ruta} className="text-decoration-none text-dark">
    <Card className="h-100 text-center card-hover cursor-pointer borde-card">
      <Card.Img
        className="altura"
        variant="top"
        src={prod.imagen}
        alt={prod.titulo}
      />

      <Card.Body className="p-0">
        <Card.Title className="text-center text-dark mb-2 mt-3">
          {prod.titulo}
        </Card.Title>

        <div className="descripcion-card py-2 my-0 text-center">
          <Card.Text className="mx-2">{prod.descripcion}</Card.Text>
        </div>
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
