import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Badge, Spinner } from "react-bootstrap";
import { useChangeTitle } from "../helpers/useChangeTitlePage";
import clientAxios, { configHeaders } from "../helpers/axios.config.helper";
import Swal from "sweetalert2";
import "./MiPlanPage.css";

const MiPlanPage = () => {
  useChangeTitle("Mi Plan");

  const [planContratado, setPlanContratado] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mapeo de imágenes de la home para los planes
  const imagenesPlanes = {
    Musculación:
      "https://res.cloudinary.com/dpy5kwico/image/upload/v1755020300/musculaci%C3%B3n1_jnsmsa.jpg",
    "SOLO CLASES":
      "https://res.cloudinary.com/dpy5kwico/image/upload/v1755020301/clases2_v1u6as.jpg",
    Funcional:
      "https://res.cloudinary.com/dpy5kwico/image/upload/v1755020301/clases2_v1u6as.jpg",
    Completo:
      "https://res.cloudinary.com/dpy5kwico/image/upload/v1755020303/full3_u19eol.webp",
  };

  useEffect(() => {
    cargarMiPlan();
  }, []);

  const cargarMiPlan = async () => {
    try {
      setLoading(true);
      const response = await clientAxios.get(
        "/usuarios/mi-plan",
        configHeaders
      );
      setPlanContratado(response.data.data);
    } catch (error) {
      console.error("Error al cargar mi plan:", error);
      if (error.response?.status === 404) {
        // Usuario sin plan contratado
        setPlanContratado(null);
      } else {
        Swal.fire("Error", "No se pudo cargar tu plan", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const getTipoPlanBadge = (tipo) => {
    const badges = {
      Musculación: "primary",
      "SOLO CLASES": "success",
      Funcional: "success",
      Completo: "warning",
    };
    return badges[tipo] || "secondary";
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calcularDiasRestantes = (fechaVencimiento) => {
    const hoy = new Date();
    const fin = new Date(fechaVencimiento);
    const diffTime = fin - hoy;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const planEstaVencido = (fechaVencimiento) => {
    const hoy = new Date();
    const fin = new Date(fechaVencimiento);
    return fin < hoy;
  };

  if (loading) {
    return (
      <div className="mi-plan-container">
        <Container className="my-5">
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3 text-muted">Cargando tu plan...</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="mi-plan-container">
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <div className="text-center mb-4">
              <h1 className="page-title text-primary">Mi Plan</h1>
              <p className="page-subtitle text-muted">
                Información de tu plan contratado
              </p>
            </div>

            {planContratado ? (
              <Card className="border-0 shadow-lg">
                <Card.Body className="p-0">
                  {/* Header del plan */}
                  <div className="plan-header text-white">
                    <Row className="align-items-center">
                      <Col
                        xs={12}
                        md={3}
                        className="text-center text-md-start mb-3 mb-md-0"
                      >
                        <img
                          src={
                            imagenesPlanes[planContratado.plan.tipo] ||
                            imagenesPlanes.Completo
                          }
                          alt={planContratado.plan.nombre}
                          className="img-fluid rounded"
                        />
                      </Col>
                      <Col xs={12} md={9}>
                        <h2 className="fw-bold mb-2">
                          {planContratado.plan.nombre}
                        </h2>
                        <div className="badge-container">
                          <Badge
                            bg={getTipoPlanBadge(planContratado.plan.tipo)}
                            className="plan-badge"
                          >
                            {planContratado.plan.tipo === "Funcional"
                              ? "SOLO CLASES"
                              : planContratado.plan.tipo}
                          </Badge>
                          {planEstaVencido(planContratado.fechaVencimiento) && (
                            <Badge bg="danger" className="plan-badge">
                              Vencido
                            </Badge>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </div>

                  {/* Detalles del plan */}
                  <div className="plan-content">
                    <Row className="plan-info-columns">
                      <Col xs={12} md={6}>
                        <h5 className="fw-bold mb-3">
                          📅 Información del Plan
                        </h5>
                        <div className="plan-text mb-3">
                          <strong>Duración:</strong> {planContratado.duracion}{" "}
                          mes
                          {planContratado.duracion > 1 ? "es" : ""}
                        </div>
                        <div className="plan-text mb-3">
                          <strong>Precio:</strong> $
                          {planContratado.precio?.toLocaleString() || "N/A"}
                        </div>
                        <div className="plan-text mb-3">
                          <strong>Fecha de contratación:</strong>{" "}
                          {formatearFecha(planContratado.createdAt)}
                        </div>
                      </Col>
                      <Col xs={12} md={6}>
                        <h5 className="fw-bold mb-3">⏰ Estado del Plan</h5>
                        <div className="plan-text mb-3">
                          <strong>Fecha de inicio:</strong>{" "}
                          {formatearFecha(planContratado.fechaInicio)}
                        </div>
                        <div className="plan-text mb-3">
                          <strong>Fecha de fin:</strong>{" "}
                          {formatearFecha(planContratado.fechaVencimiento)}
                        </div>
                        <div className="plan-text mb-3">
                          <strong>Días restantes:</strong>{" "}
                          {planEstaVencido(planContratado.fechaVencimiento) ? (
                            <Badge bg="danger" className="plan-badge">
                              Plan vencido
                            </Badge>
                          ) : (
                            <Badge
                              bg={
                                calcularDiasRestantes(
                                  planContratado.fechaVencimiento
                                ) > 7
                                  ? "success"
                                  : "warning"
                              }
                              className="plan-badge"
                            >
                              {calcularDiasRestantes(
                                planContratado.fechaVencimiento
                              )}{" "}
                              días
                            </Badge>
                          )}
                        </div>
                      </Col>
                    </Row>

                    {/* Beneficios del plan */}
                    <div className="benefits-section">
                      {planEstaVencido(planContratado.fechaVencimiento) && (
                        <div className="alert alert-warning plan-alert">
                          <strong>⚠️ Plan Vencido:</strong> Tu plan ha expirado.
                          Para continuar disfrutando de los beneficios,
                          <a href="/planes" className="alert-link ms-1">
                            renueva tu plan aquí
                          </a>
                          .
                        </div>
                      )}
                      <h5 className="fw-bold mb-3">🎯 Beneficios Incluidos</h5>
                      <Row>
                        <Col xs={12} md={6}>
                          <ul className="list-unstyled">
                            <li className="mb-2">
                              <i className="fas fa-check text-success me-2"></i>
                              Acceso a todas las clases del plan
                            </li>
                            <li className="mb-2">
                              <i className="fas fa-check text-success me-2"></i>
                              Reservas ilimitadas
                            </li>
                          </ul>
                        </Col>
                        <Col xs={12} md={6}>
                          <ul className="list-unstyled">
                            <li className="mb-2">
                              <i className="fas fa-check text-success me-2"></i>
                              Soporte personalizado
                            </li>
                            <li className="mb-2">
                              <i className="fas fa-check text-success me-2"></i>
                              Instalaciones disponibles
                            </li>
                          </ul>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ) : (
              <Card className="border-0 shadow-lg no-plan-card">
                <Card.Body>
                  <div className="mb-4">
                    <i className="fas fa-credit-card text-muted plan-icon"></i>
                  </div>
                  <h3 className="fw-bold mb-3">No tienes un plan activo</h3>
                  <p className="text-muted mb-4">
                    Para acceder a las clases y beneficios, necesitas contratar
                    un plan.
                  </p>
                  <div className="alert alert-info plan-alert">
                    <strong>¿Qué incluyen nuestros planes?</strong>
                    <ul className="list-unstyled mt-2 mb-0">
                      <li>✓ Acceso a clases especializadas</li>
                      <li>✓ Reservas ilimitadas</li>
                      <li>✓ Soporte personalizado</li>
                      <li>✓ Instalaciones de calidad</li>
                    </ul>
                  </div>
                  <a href="/planes" className="btn btn-primary btn-lg">
                    Ver Planes Disponibles
                  </a>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MiPlanPage;
