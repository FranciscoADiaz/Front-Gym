import React, { useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router";
import { useChangeTitle } from "../helpers/useChangeTitlePage";
import Swal from "sweetalert2";

const PagoExitosoPage = () => {
  useChangeTitle("Pago Exitoso");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Mostrar mensaje de éxito
    Swal.fire({
      title: "¡Pago Exitoso!",
      text: "Tu plan ha sido activado correctamente",
      icon: "success",
      confirmButtonText: "Continuar",
    });
  }, []);

  const handleVolverInicio = () => {
    navigate("/");
  };

  const handleVerMisClases = () => {
    navigate("/reservar");
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="text-center border-0 shadow">
            <Card.Body className="p-5">
              <div className="mb-4">
                <i
                  className="fas fa-check-circle text-success"
                  style={{ fontSize: "4rem" }}
                ></i>
              </div>

              <h2 className="text-success mb-3">¡Pago Exitoso!</h2>

              <p className="text-muted mb-4">
                Tu plan ha sido activado correctamente. Ya puedes disfrutar de
                todos los beneficios.
              </p>

              <div className="alert alert-success">
                <strong>Próximos pasos:</strong>
                <ul className="list-unstyled mt-2 mb-0">
                  <li>✓ Recibirás un email con los detalles de tu plan</li>
                  <li>✓ Tu plan estará activo inmediatamente</li>
                  <li>✓ Puedes reservar clases desde "Mis Clases"</li>
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

                <Button variant="success" onClick={handleVerMisClases}>
                  <i className="fas fa-dumbbell me-2"></i>
                  Ver Mis Clases
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PagoExitosoPage;



