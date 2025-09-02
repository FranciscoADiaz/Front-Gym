import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Contacto = () => {
  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const [errors, setErrors] = useState({});

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value,
    });

    // Limpiar error del campo
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrors = {};

    if (!formulario.nombre.trim()) {
      nuevosErrors.nombre = "El nombre es requerido";
    }

    if (!formulario.email.trim()) {
      nuevosErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formulario.email)) {
      nuevosErrors.email = "El email no es válido";
    }

    if (!formulario.mensaje.trim()) {
      nuevosErrors.mensaje = "El mensaje es requerido";
    }

    setErrors(nuevosErrors);
    return Object.keys(nuevosErrors).length === 0;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      // Aquí se enviaría el formulario al backend
      alert("¡Gracias por contactarnos! Te responderemos pronto.");
      setFormulario({ nombre: "", email: "", mensaje: "" });
      setErrors({});
    }
  };

  return (
    <div>
      <h3 className="text-primary fw-bold mb-4">Envíanos tu Mensaje</h3>
      <Form onSubmit={manejarEnvio}>
        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Nombre Completo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu nombre completo"
            name="nombre"
            value={formulario.nombre}
            onChange={manejarCambio}
            isInvalid={!!errors.nombre}
            className="border-0 shadow-sm"
          />
          <Form.Control.Feedback type="invalid">
            {errors.nombre}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresa tu email"
            name="email"
            value={formulario.email}
            onChange={manejarCambio}
            isInvalid={!!errors.email}
            className="border-0 shadow-sm"
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="fw-bold">Mensaje</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Escribenos tu consulta, sugerencia o comentario..."
            name="mensaje"
            value={formulario.mensaje}
            onChange={manejarCambio}
            isInvalid={!!errors.mensaje}
            className="border-0 shadow-sm"
          />
          <Form.Control.Feedback type="invalid">
            {errors.mensaje}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="text-center">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="px-4 py-2 fw-bold"
          >
            Enviar Mensaje
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
