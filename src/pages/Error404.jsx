import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useChangeTitle } from "../helpers/useChangeTitlePage";
import "./Error404.css";

const Error404 = ({
  title = "¡Oops!",
  subtitle = "Página no encontrada",
  description = "La página que buscas no existe o ha sido movida.\n¡No te preocupes, puedes volver al inicio o intentar otra ruta!",
  pageTitle = "404",
  infoText = "Error 404 - Página no encontrada",
}) => {
  const navigate = useNavigate();

  // Cambiar título de la página
  useChangeTitle(pageTitle);

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container fluid className="error-404-container">
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col xs={12} md={8} lg={6} className="text-center">
          <div className="error-404-content">
            {/* Imagen 404 */}
            <div className="error-404-image">
              <img
                src="https://res.cloudinary.com/dpy5kwico/image/upload/v1756822285/404-gym_jq83k7.png"
                alt="Página no encontrada"
                className="img-fluid"
              />
            </div>

            {/* Contenido */}
            <div className="error-404-text">
              <h1 className="error-404-title">{title}</h1>
              <h2 className="error-404-subtitle">{subtitle}</h2>
              <p className="error-404-description">
                {description.split("\n").map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    {index < description.split("\n").length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>

              {/* Botones de acción */}
              <div className="error-404-actions">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleGoHome}
                  className="me-3 mb-2"
                >
                  Volver al Inicio
                </Button>
                <Button
                  variant="outline-light"
                  size="lg"
                  onClick={handleGoBack}
                  className="mb-2"
                >
                  Volver Atrás
                </Button>
              </div>

              {/* Información adicional */}
              <div className="error-404-info">
                <p className="text-muted">{infoText}</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Error404;
