import { useNavigate } from "react-router";
import { Card, Row, Col, Button, Modal, Form, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { contratarPlan } from "../../helpers/planes.helper";
import clientAxios from "../../helpers/axios.config.helper";
import "./Componentes.css";

// Agregar script de MercadoPago
const addMercadoPagoScript = () => {
  if (document.getElementById("mercadopago-script")) return;

  const script = document.createElement("script");
  script.id = "mercadopago-script";
  script.src = "https://sdk.mercadopago.com/js/v2";
  document.head.appendChild(script);
};

const Planes = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    email: "",
    telefono: "",
    duracion: "1",
    aceptaTerminos: false,
  });
  const [loading, setLoading] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState(null);

  const planes = [
    {
      nombre: "SOLO MUSCULACIÓN",
      ruta: "musculacion",
      url: "https://res.cloudinary.com/dpy5kwico/image/upload/v1755020300/musculaci%C3%B3n1_jnsmsa.jpg",
      alt: "Área de musculación con máquinas",
      descripcion:
        "Acceso ilimitado al área de pesas y máquinas. Ideal para quienes entrenan por cuenta propia.",
      color: "primary",
    },
    {
      nombre: "SOLO CLASES",
      ruta: "clases",
      url: "https://res.cloudinary.com/dpy5kwico/image/upload/v1755020301/clases2_v1u6as.jpg",
      alt: "Clases grupales de funcional y spinning",
      descripcion:
        "Todas las clases grupales: funcional, spinning, zumba. Ideal para quienes buscan variedad y motivación.",
      color: "secondary",
    },
    {
      nombre: "PLAN FULL",
      ruta: "full",
      url: "https://res.cloudinary.com/dpy5kwico/image/upload/v1755020303/full3_u19eol.webp",
      alt: "Entrenamiento integral con musculación y clases",
      descripcion:
        "Incluye musculación y clases. La opción más completa para transformar tu cuerpo. Elegí la que más te guste.",
      color: "accent",
    },
  ];

  // Precios de los planes
  const precios = {
    "SOLO MUSCULACIÓN": { mensual: 20000, trimestral: 50000, semestral: 90000 },
    "SOLO CLASES": { mensual: 25000, trimestral: 65000, semestral: 120000 },
    "PLAN FULL": { mensual: 30000, trimestral: 80000, semestral: 150000 },
  };

  // Mapeo de nombres de display a valores del enum del backend
  const mapeoPlanes = {
    "SOLO MUSCULACIÓN": "Musculación",
    "SOLO CLASES": "Funcional",
    "PLAN FULL": "Completo",
  };

  // Obtener datos del usuario actual
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUsuarioActual(payload);

        // Obtener nombre y email del token
        const nombreToken = payload.nombreUsuario || payload.nombre || "";
        const emailToken = payload.emailUsuario || payload.email || "";

        setFormData((prev) => ({
          ...prev,
          nombreCompleto: nombreToken,
          email: emailToken,
        }));
      } catch (error) {
        console.error("Error decodificando token:", error);
      }
    }
  }, []);

  // Cargar script de MercadoPago
  useEffect(() => {
    addMercadoPagoScript();
  }, []);

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const calcularPrecio = () => {
    if (!selectedPlan) return 0;
    const precioBase = precios[selectedPlan.nombre]?.mensual || 0;
    const multiplicador =
      formData.duracion === "3" ? 2.5 : formData.duracion === "6" ? 4.5 : 1;
    return precioBase * multiplicador;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.aceptaTerminos) {
      Swal.fire(
        "❌ Error",
        "Debes aceptar los términos y condiciones",
        "error"
      );
      return;
    }

    setLoading(true);

    try {
      const planEnum = mapeoPlanes[selectedPlan.nombre] || selectedPlan.nombre;

      const response = await clientAxios.post("/pagos/crear-preferencia", {
        plan: planEnum,
        duracion: parseInt(formData.duracion),
        precio: calcularPrecio(),
      });

      if (response.data.success) {
        window.location.href = response.data.init_point;
      } else {
        throw new Error("Error al crear preferencia de pago");
      }
    } catch (error) {
      Swal.fire(
        "❌ Error",
        error.response?.data?.msg || "Error al procesar el pago",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const precio = calcularPrecio();

  return (
    <>
      <section className="bg-dark text-white padding-vertical">
        <div className="container-fluid">
          <h2 className="text-center mb-4">NUESTROS PLANES MENSUALES</h2>

          <Row className="g-4 justify-content-center">
            {planes.map((plan, i) => (
              <Col key={i} xs={10} sm={6} md={4}>
                <Card className="h-100 card-hover borde-card">
                  <Card.Body className="p-0">
                    <img
                      src={plan.url}
                      alt={plan.alt}
                      loading="lazy"
                      className="img-fluid w-100"
                      style={{
                        aspectRatio: "16/9",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />

                    <Card.Title className="text-center text-dark mb-2">
                      {plan.nombre}
                    </Card.Title>

                    <div className="descripcion-card py-2 my-0 text-center">
                      <Card.Text className="mx-2">{plan.descripcion}</Card.Text>
                    </div>

                    {/* Botón de inscripción */}
                    <div className="p-3 text-center">
                      <Button
                        variant="primary"
                        size="lg"
                        className="w-100 fw-bold"
                        onClick={() => handlePlanSelection(plan)}
                      >
                        INSCRIBIRSE
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Modal de Contratación */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            <i className="fas fa-credit-card me-2"></i>
            Contratar {selectedPlan?.nombre}
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Alert variant="info" className="mb-3">
              <strong>Plan seleccionado:</strong> {selectedPlan?.nombre}
              <br />
              <strong>Descripción:</strong> {selectedPlan?.descripcion}
            </Alert>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre Completo *</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombreCompleto"
                    value={formData.nombreCompleto}
                    onChange={handleChange}
                    required
                    placeholder="Tu nombre completo"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="tu@email.com"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Teléfono *</Form.Label>
                  <Form.Control
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                    placeholder="+54 9 11 1234-5678"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Duración *</Form.Label>
                  <Form.Select
                    name="duracion"
                    value={formData.duracion}
                    onChange={handleChange}
                    required
                  >
                    <option value="1">1 mes</option>
                    <option value="3">3 meses</option>
                    <option value="6">6 meses</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Alert variant="success" className="mb-3">
              <strong>Precio total:</strong> ARS {precio.toLocaleString()}
              <br />
              <small className="text-muted">
                {formData.duracion === "1"
                  ? "Pago mensual"
                  : formData.duracion === "3"
                  ? "Pago trimestral (con descuento)"
                  : "Pago semestral (con descuento)"}
              </small>
            </Alert>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="aceptaTerminos"
                checked={formData.aceptaTerminos}
                onChange={handleChange}
                label="Acepto los términos y condiciones"
                required
              />
            </Form.Group>

            <Alert variant="warning">
              <i className="fas fa-info-circle me-2"></i>
              <strong>Importante:</strong> Al hacer clic en "Pagar con
              MercadoPago", serás redirigido a la plataforma de pago segura de
              MercadoPago.
            </Alert>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Procesando...
                </>
              ) : (
                <>
                  <i className="fas fa-credit-card me-2"></i>
                  Pagar con MercadoPago
                </>
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Planes;
