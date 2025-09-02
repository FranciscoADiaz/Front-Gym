import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useChangeTitle } from "../helpers/useChangeTitlePage";

const Sobrenosotros = () => {
  useChangeTitle("Sobre Nosotros");

  return (
    <Container className="my-4">
      {/* Header */}
      <div className="bg-primary text-white p-4 rounded-3 mb-4 shadow">
        <Row className="align-items-center">
          <Col>
            <h1 className="mb-2 fw-bold">Sobre Nosotros</h1>
            <p className="mb-0">Conoce más sobre Tucumán Gym</p>
          </Col>
          <Col xs="auto">
            <div className="text-end">
              <i className="fas fa-dumbbell fs-1"></i>
            </div>
          </Col>
        </Row>
      </div>

      {/* Contenido Principal */}
      <Row className="g-4">
        {/* Misión */}
        <Col lg={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="text-center p-4">
              <div className="mb-3">
                <i className="fas fa-bullseye text-primary fs-1"></i>
              </div>
              <Card.Title className="fw-bold mb-3">Nuestra Misión</Card.Title>
              <Card.Text className="text-muted">
                Transformar vidas a través del ejercicio físico, la motivación y
                una comunidad saludable. Nos dedicamos a fomentar el bienestar
                físico y emocional de nuestros socios, acompañándolos en cada
                paso de su progreso.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Visión */}
        <Col lg={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="text-center p-4">
              <div className="mb-3">
                <i className="fas fa-eye text-primary fs-1"></i>
              </div>
              <Card.Title className="fw-bold mb-3">Nuestra Visión</Card.Title>
              <Card.Text className="text-muted">
                Ser el gimnasio líder en Tucumán, reconocido por la excelencia
                en el servicio, la calidad de nuestros entrenadores y la
                comunidad que hemos construido. Aspiramos a ser el lugar donde
                todos encuentren su mejor versión.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Valores */}
        <Col lg={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="text-center p-4">
              <div className="mb-3">
                <i className="fas fa-heart text-primary fs-1"></i>
              </div>
              <Card.Title className="fw-bold mb-3">Nuestros Valores</Card.Title>
              <Card.Text className="text-muted">
                <strong>Compromiso:</strong> Con el progreso de cada socio
                <br />
                <strong>Excelencia:</strong> En todos nuestros servicios
                <br />
                <strong>Comunidad:</strong> Un ambiente de apoyo mutuo
                <br />
                <strong>Innovación:</strong> En métodos de entrenamiento
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Historia */}
      <div className="mt-5">
        <Card className="shadow-sm border-0">
          <Card.Body className="p-4">
            <Row className="align-items-center">
              <Col lg={6}>
                <h3 className="text-primary fw-bold mb-3">Nuestra Historia</h3>
                <p className="text-muted mb-3">
                  Fundado en 2023 en el corazón de Tucumán,{" "}
                  <strong>Tucumán Gym</strong> nació de la pasión por el fitness
                  y el deseo de crear un espacio donde las personas pudieran
                  alcanzar sus objetivos de manera saludable y sostenible.
                </p>
                <p className="text-muted mb-3">
                  Comenzamos como un pequeño gimnasio con grandes sueños, y hoy
                  seguimos creciendo con el compromiso de brindar el mejor
                  servicio, contando con entrenadores certificados, clases
                  dinámicas y planes accesibles para todos.
                </p>
                <p className="text-muted mb-0">
                  Nuestro crecimiento ha sido posible gracias a la confianza de
                  nuestra comunidad, que día a día nos motiva a mejorar y
                  expandir nuestros servicios.
                </p>
              </Col>
              <Col lg={6} className="text-center">
                <div className="bg-light rounded-3 p-4">
                  <i className="fas fa-history text-primary fs-1 mb-3"></i>
                  <h5 className="fw-bold text-primary">Desde 2023</h5>
                  <p className="text-muted mb-0">
                    Construyendo una comunidad fitness
                  </p>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>

      {/* Equipo */}
      <div className="mt-5">
        <div className="bg-light p-4 rounded-3">
          <h3 className="text-primary fw-bold mb-4 text-center">
            Nuestro Equipo
          </h3>
          <Row className="g-4">
            <Col md={4}>
              <div className="text-center">
                <div
                  className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "80px", height: "80px" }}
                >
                  <i className="fas fa-user-tie fs-3"></i>
                </div>
                <h5 className="fw-bold">Entrenadores Certificados</h5>
                <p className="text-muted small">
                  Profesionales con amplia experiencia en fitness y bienestar
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center">
                <div
                  className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "80px", height: "80px" }}
                >
                  <i className="fas fa-users fs-3"></i>
                </div>
                <h5 className="fw-bold">Personal de Atención</h5>
                <p className="text-muted small">
                  Equipo comprometido con brindar la mejor experiencia
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center">
                <div
                  className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "80px", height: "80px" }}
                >
                  <i className="fas fa-tools fs-3"></i>
                </div>
                <h5 className="fw-bold">Mantenimiento</h5>
                <p className="text-muted small">
                  Equipos en perfecto estado para tu entrenamiento
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
};

export default Sobrenosotros;
