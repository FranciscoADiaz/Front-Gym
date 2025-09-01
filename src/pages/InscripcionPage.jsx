import { useParams, useNavigate } from "react-router";
import { Container, Card, Row, Col, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useChangeTitle } from "../helpers/useChangeTitlePage";

const PLANES = {
  musculacion: {
    nombre: "SOLO MUSCULACIÓN",
    descripcion:
      "Acceso ilimitado al área de pesas y máquinas. Ideal para quienes entrenan por cuenta propia.",
    precio: "ARS 20.000 / mes",
    color: "primary",
  },
  clases: {
    nombre: "SOLO CLASES",
    descripcion:
      "Todas las clases grupales: funcional, spinning, zumba. Ideal para quienes buscan variedad y motivación.",
    precio: "ARS 25.000 / mes",
    color: "secondary",
  },
  full: {
    nombre: "PLAN FULL",
    descripcion:
      "Incluye musculación + todas las clases. La opción más completa para transformar tu cuerpo.",
    precio: "ARS 30.000 / mes",
    color: "accent",
  },
};

const InscripcionPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  useChangeTitle("Inscripción");

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    dni: "",
    fechaNacimiento: "",
    direccion: "",
    planSeleccionado: slug,
  });

  const plan = PLANES[slug];

  if (!plan) {
    return (
      <Container className="py-5 text-center">
        <h2>Plan no encontrado</h2>
        <Button variant="primary" className="mt-3" onClick={() => navigate(-1)}>
          Volver
        </Button>
      </Container>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("¡Inscripción exitosa! Te contactaremos pronto.");
    navigate("/planes");
  };

  return (
    <div className="contenedor-pagina">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card className="shadow">
              <Card.Header className="text-center bg-primary text-white">
                <h3>Inscripción - {plan.nombre}</h3>
                <p className="mb-0">{plan.descripcion}</p>
                <p className="mb-0 fw-bold">{plan.precio}</p>
              </Card.Header>

              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Nombre *</Form.Label>
                        <Form.Control
                          type="text"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Apellido *</Form.Label>
                        <Form.Control
                          type="text"
                          name="apellido"
                          value={formData.apellido}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email *</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Teléfono *</Form.Label>
                        <Form.Control
                          type="tel"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>DNI *</Form.Label>
                        <Form.Control
                          type="text"
                          name="dni"
                          value={formData.dni}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Fecha de Nacimiento *</Form.Label>
                        <Form.Control
                          type="date"
                          name="fechaNacimiento"
                          value={formData.fechaNacimiento}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Label>Dirección *</Form.Label>
                    <Form.Control
                      type="text"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <div className="d-flex gap-2 justify-content-center">
                    <Button variant="primary" type="submit" size="lg">
                      Completar Inscripción
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => navigate(-1)}
                      size="lg"
                    >
                      Cancelar
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default InscripcionPage;
