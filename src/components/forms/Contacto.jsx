import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import sendContactMessage from "../../helpers/contacto.helper";
import { showSuccess, showError } from "../../helpers/swal.helper";

const INITIAL_FORM_STATE = {
  nombre: "",
  email: "",
  mensaje: "",
};

const Contacto = () => {
  const [formValues, setFormValues] = useState(INITIAL_FORM_STATE);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormValues((prev) => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formValues.nombre.trim()) newErrors.nombre = "El nombre es requerido";

    if (!formValues.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = "El email no es válido";
    }

    if (!formValues.mensaje.trim()) {
      newErrors.mensaje = "El mensaje es requerido";
    } else if (formValues.mensaje.trim().length < 10) {
      newErrors.mensaje = "El mensaje debe tener al menos 10 caracteres";
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormValues(INITIAL_FORM_STATE);
    setFormErrors({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      const { msg } = await sendContactMessage(formValues);
      await showSuccess(
        "Mensaje enviado",
        msg || "Recibimos tu consulta y responderemos a la brevedad."
      );
      resetForm();
    } catch (error) {
      showError(
        "No pudimos enviar tu mensaje",
        error.message ||
          "Ocurrió un error inesperado. Intenta nuevamente en unos minutos."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h3 className="text-primary fw-bold mb-4">Envíanos tu Mensaje</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Nombre Completo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu nombre completo"
            name="nombre"
            value={formValues.nombre}
            onChange={handleChange}
            isInvalid={!!formErrors.nombre}
            className="border-0 shadow-sm"
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.nombre}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresa tu email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            isInvalid={!!formErrors.email}
            className="border-0 shadow-sm"
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="fw-bold">Mensaje</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Escribenos tu consulta, sugerencia o comentario..."
            name="mensaje"
            value={formValues.mensaje}
            onChange={handleChange}
            isInvalid={!!formErrors.mensaje}
            className="border-0 shadow-sm"
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.mensaje}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="text-center">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="px-4 py-2 fw-bold"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Enviando...
              </>
            ) : (
              "Enviar Mensaje"
            )}
          </Button>
        </div>
      </Form>

      <div className="mt-4 p-3 bg-light rounded-3">
        <h6 className="fw-bold text-primary mb-2">¿Por qué contactarnos?</h6>
        <ul className="text-muted small mb-0">
          <li>Información sobre nuestros planes y servicios</li>
          <li>Consultas sobre horarios y clases</li>
          <li>Sugerencias y comentarios</li>
          <li>Soporte técnico</li>
        </ul>
      </div>
    </div>
  );
};

export default Contacto;
