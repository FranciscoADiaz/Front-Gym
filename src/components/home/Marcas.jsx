import { Container, Row, Col, Image } from "react-bootstrap";
import "./Marcas.css";
import marca1 from "../../assets/marca1.svg";
import marca2 from "../../assets/marca2.jpg";
import marca3 from "../../assets/marca3.png";
import marca4 from "../../assets/marca4.png";
import marca6 from "../../assets/marca6.png";

const marcas = [
  {
    nombre: "WheyPro",
    imagen: marca1,
  },

  {
    nombre: "NutriFit",
    imagen: marca3,
  },
  {
    nombre: "StrongWear",
    imagen: marca4,
  },
  {
    nombre: "PowerLabs",
    imagen: marca6,
  },
  {
    nombre: "Gatorade",
    imagen: marca2,
  }
];

const MarcasC = () => {
  return (
    <section className="py-5 bg-white">
      <Container>
        <h2 className="text-center mb-4">Marcas Asociadas</h2>
        <Row className="justify-content-center align-items-center g-4">
          {marcas.map((marca, i) => (
            <Col key={i} xs={6} sm={4} md={3} lg={2} className="text-center">
              <Image
                src={marca.imagen}
                alt={marca.nombre}
                fluid
                className="marca-logo"
              />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default MarcasC;
