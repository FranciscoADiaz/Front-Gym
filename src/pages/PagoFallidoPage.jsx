import React, { useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router";
import { useChangeTitle } from "../helpers/useChangeTitlePage";
import Swal from "sweetalert2";

const PagoFallidoPage = () => {
  useChangeTitle("Pago Fallido");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Mostrar mensaje de error
    Swal.fire({
      title: "Pago Fallido",
      text: "Hubo un problema al procesar tu pago. Inténtalo nuevamente.",
      icon: "error",
      confirmButtonText: "Entendido",
    });
  }, []);

  const handleVolverInicio = () => {
    navigate("/");
  };

  const handleVolverPlanes = () => {
    navigate("/planes");
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="text-center border-0 shadow">
            <Card.Body className="p-5">
              <div className="mb-4">
                <i
                  className="fas fa-times-circle text-danger"
                  style={{ fontSize: "4rem" }}
                ></i>
              </div>

              <h2 className="text-danger mb-3">Pago Fallido</h2>

              <p className="text-muted mb-4">
                Hubo un problema al procesar tu pago. No te preocupes, no se
                realizó ningún cargo.
              </p>

              <div className="alert alert-warning">
                <strong>Posibles causas:</strong>
                <ul className="list-unstyled mt-2 mb-0">
                  <li>• Problemas de conexión</li>
                  <li>• Tarjeta rechazada</li>
                  <li>• Fondos insuficientes</li>
                  <li>• Datos incorrectos</li>
                </ul>
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content-md-center mt-4">
                <Button
                  variant="outline-primary"
                  onClick={handleVolverInicio}
                  className="me-md-2"
                >
                  <i className="fas fa-home me-2"></i>
                  Volver al Inicio
                </Button>

                <Button variant="warning" onClick={handleVolverPlanes}>
                  <i className="fas fa-credit-card me-2"></i>
                  Intentar Nuevamente
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PagoFallidoPage;



