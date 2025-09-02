import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useChangeTitle } from "../helpers/useChangeTitlePage";
import Contacto from "../components/forms/Contacto";
import { FaInstagram, FaFacebook, FaXTwitter, FaTiktok } from "react-icons/fa6";

const ContactoPage = () => {
  useChangeTitle("Contacto");

  return (
    <Container className="my-4">
      {/* Header */}
      <div className="bg-primary text-white p-4 rounded-3 mb-4 shadow">
        <Row className="align-items-center">
          <Col>
            <h1 className="mb-2 fw-bold">Contacto</h1>
            <p className="mb-0">Estamos aquí para ayudarte</p>
          </Col>
          <Col xs="auto">
            <div className="text-end">
              <i className="fas fa-phone fs-1"></i>
            </div>
          </Col>
        </Row>
      </div>

      <Row className="g-4">
        {/* Información de Contacto */}
        <Col lg={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="p-4">
              <h3 className="text-primary fw-bold mb-4">
                Información de Contacto
              </h3>

              <div className="mb-4">
                <div className="d-flex align-items-center mb-3">
                  <div
                    className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Dirección</h6>
                    <p className="text-muted mb-0">Av. Mitre 1234, Tucumán</p>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-3">
                  <div
                    className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <i className="fas fa-clock"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Horarios</h6>
                    <p className="text-muted mb-0">
                      Lunes a Sábados - 8:00 a 22:00 hs
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-3">
                  <div
                    className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <i className="fas fa-phone"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Teléfono</h6>
                    <p className="text-muted mb-0">381-1234567</p>
                  </div>
                </div>

                <div className="d-flex align-items-center">
                  <div
                    className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Email</h6>
                    <p className="text-muted mb-0">
                      tucuman.gym.contacto@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Formulario de Contacto */}
        <Col lg={8}>
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
              <Contacto />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Redes Sociales */}
      <div className="mt-5">
        <Card className="shadow-sm border-0">
          <Card.Body className="p-4">
            <h3 className="text-primary fw-bold mb-4 text-center">
              Síguenos en Redes Sociales
            </h3>
            <Row className="g-4 contacto-redes">
              <Col md={3}>
                <div className="text-center">
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    <FaInstagram className="fs-1 mb-3" />
                    <h6 className="fw-bold">Instagram</h6>
                    <p className="text-muted small">@tucumangym</p>
                  </a>
                </div>
              </Col>
              <Col md={3}>
                <div className="text-center">
                  <a
                    href="https://www.facebook.com/?locale=es_LA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    <FaFacebook className="fs-1 mb-3" />
                    <h6 className="fw-bold">Facebook</h6>
                    <p className="text-muted small">Tucumán Gym</p>
                  </a>
                </div>
              </Col>
              <Col md={3}>
                <div className="text-center">
                  <a
                    href="https://www.tiktok.com/es/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    <FaTiktok className="fs-1 mb-3" />
                    <h6 className="fw-bold">TikTok</h6>
                    <p className="text-muted small">@tucumangym</p>
                  </a>
                </div>
              </Col>
              <Col md={3}>
                <div className="text-center">
                  <a
                    href="https://x.com/?lang=es"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    <FaXTwitter className="fs-1 mb-3" />
                    <h6 className="fw-bold">Twitter</h6>
                    <p className="text-muted small">@tucumangym</p>
                  </a>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default ContactoPage;
