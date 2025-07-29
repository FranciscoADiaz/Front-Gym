// src/pages/ContactoPage.jsx
import { Container, Form, Button } from "react-bootstrap";
import { useState } from "react";

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
    console.log("Mensaje enviado:", formulario);
    // Podés reemplazar esto con una petición a tu backend o usar EmailJS
    alert("Gracias por contactarnos. Te responderemos pronto.");
    setFormulario({ nombre: "", email: "", mensaje: "" });
  };

  return (
    <section className="py-5 bg-white">
      <Container>
        <h2 className="text-center mb-4">Contacto</h2>
        <Form onSubmit={manejarEnvio}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tu nombre"
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
              placeholder="ejemplo@email.com"
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
          <Button type="submit" variant="primary">
            Enviar mensaje
          </Button>
        </Form>
      </Container>
    </section>
  );
};

export default Contacto;
