import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router";
import logo from "../../assets/logo.png";

const FooterC = () => {
  return (
    <footer className="bg-secondary text-white py-4 mt-5">
      <Container>
        <Row className="text-center text-md-start">
          <Col xs={12} md={4} className="mb-3">
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                style={{ width: "80px", height: "auto", cursor: "pointer" }}
              />
            </Link>
          </Col>

          <Col xs={12} md={4} className="mb-3">
            <h6>Enlaces útiles</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-light text-decoration-none">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/planes" className="text-light text-decoration-none">
                  Planes
                </Link>
              </li>
              <li>
                <Link
                  to="/productos"
                  className="text-light text-decoration-none"
                >
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  to="/contacto"
                  className="text-light text-decoration-none"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </Col>

          <Col xs={12} md={4} className="mb-3">
            <h6>Seguinos</h6>
            <ul className="list-unstyled">
              <li>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light text-decoration-none me-3"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5493810000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light text-decoration-none"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </Col>
        </Row>

        {/* Línea inferior */}
        <hr className="border-light" />
        <p className="text-center mb-0 small">
          © {new Date().getFullYear()} TucuGym. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
};

export default FooterC;
