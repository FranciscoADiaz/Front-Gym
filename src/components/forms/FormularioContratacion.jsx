import { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Alert } from "react-bootstrap";
import Swal from "sweetalert2";
import { contratarPlan } from "../../helpers/planes.helper";

const FormularioContratacion = ({ show, handleClose, plan, onSuccess }) => {
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    email: "",
    telefono: "",
    metodoPago: "efectivo",
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
        setFormData((prev) => ({
          ...prev,
          nombreCompleto: payload.nombreUsuario || "",
          email: payload.emailUsuario || "",
        }));
      } catch (error) {
        console.error("Error decodificando token:", error);
      }
    }
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
      await contratarPlan({
        plan: plan.nombre,
        duracion: formData.duracion,
        precio: calcularPrecio(),
        metodoPago: formData.metodoPago,
        usuarioId: usuarioActual?.idUsuario,
      });

      Swal.fire(
        "✅ ¡Plan contratado!",
        "Te hemos enviado un email con los detalles",
        "success"
      );
      onSuccess();
      handleClose();
    } catch (error) {
      Swal.fire(
        "❌ Error",
        error.response?.data?.msg || "Error al contratar el plan",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const precio = calcularPrecio();

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Contratar Plan: {plan.nombre}</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {/* Información del plan */}
          <Alert variant="info" className="mb-4">
            <h5>Detalles del Plan</h5>
            <p className="mb-2">{plan.descripcion}</p>
            <div className="d-flex justify-content-between align-items-center">
              <strong>Precio mensual:</strong>
              <span className="h5 mb-0">
                ${precios[plan.nombre]?.mensual?.toLocaleString()}
              </span>
            </div>
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
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Método de Pago *</Form.Label>
                <Form.Select
                  name="metodoPago"
                  value={formData.metodoPago}
                  onChange={handleChange}
                  required
                >
                  <option value="efectivo">Efectivo</option>
                  <option value="transferencia">Transferencia bancaria</option>
                  <option value="tarjeta">Tarjeta de crédito/débito</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <div className="p-3 bg-light rounded">
                <h6 className="mb-2">Resumen de Compra</h6>
                <div className="d-flex justify-content-between">
                  <span>Plan:</span>
                  <span>{plan.nombre}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Duración:</span>
                  <span>
                    {formData.duracion} mes
                    {formData.duracion !== "1" ? "es" : ""}
                  </span>
                </div>
                <hr className="my-2" />
                <div className="d-flex justify-content-between">
                  <strong>Total:</strong>
                  <strong className="text-primary">
                    ${precio.toLocaleString()}
                  </strong>
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

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="success"
            type="submit"
            disabled={loading || !formData.aceptaTerminos}
            size="lg"
          >
            {loading
              ? "Procesando..."
              : `Contratar por $${precio.toLocaleString()}`}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default FormularioContratacion;
