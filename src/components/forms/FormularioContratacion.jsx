import { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Alert } from "react-bootstrap";
import Swal from "sweetalert2";
import { contratarPlan } from "../../helpers/planes.helper";
import clientAxios from "../../helpers/axios.config.helper";
import "./FormularioContratacion.css";

// Agregar script de MercadoPago
const addMercadoPagoScript = () => {
  if (document.getElementById("mercadopago-script")) return;

  const script = document.createElement("script");
  script.id = "mercadopago-script";
  script.src = "https://sdk.mercadopago.com/js/v2";
  document.head.appendChild(script);
};

const FormularioContratacion = ({ show, handleClose, plan, onSuccess }) => {
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    email: "",
    telefono: "",
    duracion: "1",
    aceptaTerminos: false,
  });

  const [loading, setLoading] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState(null);

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

  // Precios de los planes
  const precios = {
    "SOLO MUSCULACIÓN": { mensual: 15000, trimestral: 40000, semestral: 70000 },
    "SOLO CLASES": { mensual: 18000, trimestral: 48000, semestral: 84000 },
    "PLAN FULL": { mensual: 25000, trimestral: 65000, semestral: 110000 },
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const calcularPrecio = () => {
    const precioBase = precios[plan.nombre]?.mensual || 0;
    const multiplicador =
      formData.duracion === "3" ? 2.7 : formData.duracion === "6" ? 4.7 : 1;
    return precioBase * multiplicador;
  };

  // Mapeo de nombres de display a valores del enum del backend
  const mapeoPlanes = {
    "SOLO MUSCULACIÓN": "Musculación",
    "SOLO CLASES": "Funcional", // Asumiendo que "SOLO CLASES" corresponde a "Funcional"
    "PLAN FULL": "Completo",
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
      const planEnum = mapeoPlanes[plan.nombre] || plan.nombre;

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
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title className="fw-bold">
          <i className="fas fa-dumbbell me-2"></i>
          INSCRIPCIÓN - {plan.nombre}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body className="p-4">
          {/* Información detallada del plan */}
          <div className="row mb-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <img
                  src={plan.url}
                  alt={plan.alt}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title text-primary fw-bold">
                    {plan.nombre}
                  </h5>
                  <p className="card-text text-muted">{plan.descripcion}</p>
                </div>
              </div>
            </div>

            <div className="col-md-8">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-header bg-light">
                  <h5 className="mb-0 fw-bold text-primary">
                    <i className="fas fa-info-circle me-2"></i>
                    Detalles del Plan
                  </h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="fw-bold text-success">
                        Beneficios Incluidos:
                      </h6>
                      <ul className="list-unstyled beneficios-list">
                        {plan.nombre === "SOLO MUSCULACIÓN" && (
                          <>
                            <li>
                              <i className="fas fa-check text-success me-2"></i>
                              Acceso ilimitado al área de pesas
                            </li>
                            <li>
                              <i className="fas fa-check text-success me-2"></i>
                              Máquinas de musculación
                            </li>
                            <li>
                              <i className="fas fa-check text-success me-2"></i>
                              Zona de cardio
                            </li>
                            <li>
                              <i className="fas fa-check text-success me-2"></i>
                              Vestuarios y duchas
                            </li>
                          </>
                        )}
                        {plan.nombre === "SOLO CLASES" && (
                          <>
                            <li>
                              <i className="fas fa-check text-success me-2"></i>
                              Clases de Spinning
                            </li>
                            <li>
                              <i className="fas fa-check text-success me-2"></i>
                              Clases Funcionales
                            </li>
                            <li>
                              <i className="fas fa-check text-success me-2"></i>
                              Clases de Crossfit
                            </li>
                            <li>
                              <i className="fas fa-check text-success me-2"></i>
                              Instructores certificados
                            </li>
                          </>
                        )}
                        {plan.nombre === "PLAN FULL" && (
                          <>
                            <li>
                              <i className="fas fa-check text-success me-2"></i>
                              Todo lo de Musculación
                            </li>
                            <li>
                              <i className="fas fa-check text-success me-2"></i>
                              Todas las clases grupales
                            </li>
                            <li>
                              <i className="fas fa-check text-success me-2"></i>
                              Acceso completo al gimnasio
                            </li>
                            <li>
                              <i className="fas fa-check text-success me-2"></i>
                              Asesoramiento personalizado
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <h6 className="fw-bold text-primary">Precios:</h6>
                      <div className="pricing-table">
                        <div className="d-flex justify-content-between mb-2">
                          <span>1 mes:</span>
                          <strong className="text-primary">
                            ${precios[plan.nombre]?.mensual?.toLocaleString()}
                          </strong>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>3 meses:</span>
                          <strong className="text-success">
                            $
                            {precios[plan.nombre]?.trimestral?.toLocaleString()}
                          </strong>
                          <small className="text-success">(-10%)</small>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>6 meses:</span>
                          <strong className="text-success">
                            ${precios[plan.nombre]?.semestral?.toLocaleString()}
                          </strong>
                          <small className="text-success">(-15%)</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-4" />

          <h5 className="mb-3 fw-bold text-primary">
            <i className="fas fa-user-edit me-2"></i>
            Datos de Inscripción
          </h5>

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
                  disabled={!!usuarioActual}
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
                  disabled={!!usuarioActual}
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
                  placeholder="+54 9 381 123-4567"
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
                  <option value="3">3 meses (10% descuento)</option>
                  <option value="6">6 meses (15% descuento)</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <div className="card border-0 shadow-sm resumen-compra">
                <div className="card-header bg-success text-white">
                  <h6 className="mb-0 fw-bold">
                    <i className="fas fa-calculator me-2"></i>
                    Resumen de Inscripción
                  </h6>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Plan seleccionado:</span>
                    <strong className="text-primary">{plan.nombre}</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Duración:</span>
                    <span>
                      {formData.duracion} mes
                      {formData.duracion !== "1" ? "es" : ""}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Método de pago:</span>
                    <span className="text-success fw-bold">MercadoPago</span>
                  </div>
                  <hr className="my-3" />
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Total a pagar:</h5>
                    <h4 className="mb-0 text-success fw-bold">
                      ${precio.toLocaleString()}
                    </h4>
                  </div>
                  {formData.duracion !== "1" && (
                    <small className="text-success">
                      <i className="fas fa-gift me-1"></i>
                      ¡Ahorrás $
                      {precios[plan.nombre]?.mensual *
                        parseInt(formData.duracion) -
                        precio}{" "}
                      con este plan!
                    </small>
                  )}
                </div>
              </div>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Acepto los términos y condiciones del gimnasio"
              name="aceptaTerminos"
              checked={formData.aceptaTerminos}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer className="bg-light border-0">
          <div className="d-flex justify-content-between w-100 align-items-center">
            <Button variant="outline-secondary" onClick={handleClose} size="lg">
              <i className="fas fa-times me-2"></i>
              Cancelar
            </Button>
            <Button
              variant="success"
              type="submit"
              disabled={loading || !formData.aceptaTerminos}
              size="lg"
              className="px-5 fw-bold btn-inscripcion"
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin me-2"></i>
                  Procesando...
                </>
              ) : (
                <>
                  <i className="fab fa-mercado-pago me-2"></i>
                  Pagar con MercadoPago - ${precio.toLocaleString()}
                </>
              )}
            </Button>
          </div>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default FormularioContratacion;
