import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import "./FormC.css";

const Contacto = () => {
  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    alert("Gracias por contactarnos. Te responderemos pronto.");
    setFormulario({ nombre: "", email: "", mensaje: "" });
  };

  return (
    <div className="formulario-page form-personalizado text-center">
      <Form onSubmit={manejarEnvio}>
        <h2 className="text-center mb-4 form-titulo">Contacto 📞</h2>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu nombre"
            name="nombre"
            value={formulario.nombre}
            onChange={manejarCambio}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresa tu email"
            name="email"
            value={formulario.email}
            onChange={manejarCambio}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Escribinos tu consulta..."
            name="mensaje"
            value={formulario.mensaje}
            onChange={manejarCambio}
            required
          />
        </Form.Group>
        <div className="text-center">
          <Button type="submit" variant="primary">
            Enviar mensaje
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Contacto;
