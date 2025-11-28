import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaCog, FaRocket } from "react-icons/fa";
import { useChangeTitlePage } from "../../helpers/useChangeTitlePage";

const ComingSoon = ({ 
  title = "¡Próximamente!", 
  subtitle, 
  description, 
  pageTitle,
  icon: Icon = FaRocket 
}) => {
  useChangeTitlePage(pageTitle || "Próximamente");

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="text-center shadow-lg border-0">
            <Card.Body className="p-5">
              <div className="mb-4">
                <Icon size={80} className="text-primary mb-3" />
              </div>
              
              <h1 className="display-4 fw-bold text-primary mb-3">
                {title}
              </h1>
              
              {subtitle && (
                <h2 className="h3 text-secondary mb-4">
                  {subtitle}
                </h2>
              )}
              
              <p className="lead text-muted mb-4" style={{ whiteSpace: 'pre-line' }}>
                {description}
              </p>
              
              <div className="d-flex align-items-center justify-content-center text-muted">
                <FaCog className="me-2 fa-spin" />
                <small>Trabajando en ello...</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ComingSoon;
