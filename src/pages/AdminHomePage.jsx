import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { useChangeTitle } from "../helpers/useChangeTitlePage";
import { getNombreUsuario } from "../helpers/auth.helper";

const AdminHomePage = () => {
  useChangeTitle("admin");

  const [admin, setAdmin] = useState({ nombre: "" });

  useEffect(() => {
    const nombre = getNombreUsuario();
    if (nombre) {
      setAdmin({ nombre });
    }
  }, []);

  return (
    <Container idPage="admin" className="my-4">
      <div className="bg-primary text-white p-4 rounded-3 mb-4 shadow">
        <h1 className="mb-2 fw-bold">👋 Bienvenido, {admin.nombre}</h1>
        <p className="mb-0">
          Gestión simplificada: planes mensuales, pagos y usuarios.
        </p>
      </div>

      <Row className="g-4">
        <Col md={4}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Card.Title>Planes</Card.Title>
              <Card.Text>
                Administra los planes mensuales y verifica pagos.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Card.Title>Usuarios</Card.Title>
              <Card.Text>
                Revisa altas, roles y estados de los usuarios.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Card.Title>Pagos</Card.Title>
              <Card.Text>
                Mercado Pago para las suscripciones de los planes.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminHomePage;
