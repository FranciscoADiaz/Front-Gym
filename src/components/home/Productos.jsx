import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router";
import "./Componentes.css";

const productos = [
  {
    titulo: "SUPLEMENTOS",
    url: "https://res.cloudinary.com/dpy5kwico/image/upload/f_auto,q_auto,c_fill,w_600,h_360/v1754950153/suplemento_elt35x.jpg",
    descripcion:
      "Proteína, creatina, pre-entreno y batidos listos para consumir.",
    ruta: "/productos/suplementos",
  },
  {
    titulo: "ACCESORIOS",
    url: "https://res.cloudinary.com/dpy5kwico/image/upload/f_auto,q_auto,c_fill,w_600,h_360/v1754950146/accesorios_qlmfpt.jpg",
    descripcion: "Guantes, cinturones de fuerza, vendas, agarraderas y más.",
    ruta: "/productos/accesorios",
  },
  {
    titulo: "ROPA DEPORTIVA",
    url: "https://res.cloudinary.com/dpy5kwico/image/upload/f_auto,q_auto,c_fill,w_600,h_360/v1754950153/ropadeportiva_cheeph.jpg",
    descripcion:
      "Camisetas dry-fit, shorts y joggers cómodos. Todo lo necesario para entrenar. ",
    ruta: "/productos/ropa-deportiva",
  },
];

const Productos = () => {
  return (
    <section className="section-neutral-soft padding-vertical contenedor-pagina">
      <Container>
        <h2 className="text-center mb-4">PRODUCTOS DISPONIBLES</h2>

        <Row className="g-4 justify-content-center">
          {productos.map((prod, i) => (
            <Col key={i} xs={10} sm={6} md={4}>
              <Link
                to={prod.ruta}
                className="text-decoration-none text-dark d-block"
              >
                <Card className="h-100 text-center card-hover cursor-pointer borde-card bg-white text-dark">
                  <Card.Img
                    className="altura"
                    variant="top"
                    src={prod.url}
                    alt={prod.titulo}
                    loading="lazy"
                    style={{
                      objectFit: "cover",
                      aspectRatio: "16/9",
                    }}
                  />

                  <Card.Body className="p-0">
                    <Card.Title className="text-center text-dark mb-2 mt-3">
                      {prod.titulo}
                    </Card.Title>

                    <div
                      className="py-2 my-0 text-center"
                      style={{ background: "#f8f9fa" }}
                    >
                      <Card.Text className="mx-2 text-muted">
                        {prod.descripcion}
                      </Card.Text>
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
