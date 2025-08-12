import { Container, Row, Col } from "react-bootstrap";
import {
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa6";
import "./FooterC.css";
import "../home/Componentes.css";


const FooterC = () => {
  return (
    <footer className="footer bg-dark text-white pt-4">
      <Container className="pb-3">
        <Row className="text-center text-md-start align-items-center">
        
          <Col xs={12} md={4} className="mb-4 mb-md-0">
            <a href="/" aria-label="Inicio">
              <img
                src={"https://res.cloudinary.com/dpy5kwico/image/upload/v1754950155/logo_vbmdlo.png"}
                alt="Logo TucuGym"
                style={{ maxHeight: "80px", width: "auto" }}
                className="d-block mx-auto mx-md-0 mb-2 img-circular-sm"
              />
            </a>
          </Col>

          <Col
            xs={12}
            md={4}
            className="mb-4 mb-md-0 d-flex flex-column align-items-center align-items-md-start"
          >
            <h6 className="text-uppercase mb-3">Seguinos</h6>
            <div className="d-flex gap-3 fs-5">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white footer-icon"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.facebook.com/?locale=es_LA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white footer-icon"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.tiktok.com/es/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white footer-icon"
              >
                <FaTiktok />
              </a>
              <a
                href="https://www.whatsapp.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white footer-icon"
              >
                <FaWhatsapp />
              </a>
            </div>
          </Col>

          <Col xs={12} md={4}>
            <h6 className="text-uppercase mb-3">Contacto</h6>
            <p className="mb-1 small">Av. Mitre 1234, Tucumán</p>
            <p className="mb-1 small">Lunes a Sábados - 8 a 22 hs</p>
            <p className="mb-1 small">Tel: 381-1234567</p>
            <p className="mb-0 small">tucuman.gym.contacto@gmail.com</p>
          </Col>
        </Row>
      </Container>

      <div className="footer-bottom text-center py-2 bg-secondary text-white-50 small">
        © 2025 Tucumán Gym. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default FooterC;
