import React from "react";
import { Card, Row, Col, ProgressBar } from "react-bootstrap";

const EstadisticasClases = ({ clases }) => {
  const calcularEstadisticas = () => {
    const total = clases.length;
    const activas = clases.filter((c) => c.estado === "activa").length;
    const inactivas = clases.filter((c) => c.estado === "inactiva").length;
    const suspendidas = clases.filter((c) => c.estado === "suspendida").length;

    const cuposTotales = clases.reduce((total, c) => total + c.capacidad, 0);
    const duracionPromedio =
      clases.length > 0
        ? Math.round(
            clases.reduce((total, c) => total + c.duracion, 0) / clases.length
          )
        : 0;

    const precioPromedio =
      clases.length > 0
        ? Math.round(
            clases.reduce((total, c) => total + c.precio, 0) / clases.length
          )
        : 0;

    // Estadísticas por tipo de clase
    const porTipo = clases.reduce((acc, clase) => {
      acc[clase.tipoClase] = (acc[clase.tipoClase] || 0) + 1;
      return acc;
    }, {});

    // Estadísticas por profesor
    const porProfesor = clases.reduce((acc, clase) => {
      acc[clase.profesor] = (acc[clase.profesor] || 0) + 1;
      return acc;
    }, {});

    return {
      total,
      activas,
      inactivas,
      suspendidas,
      cuposTotales,
      duracionPromedio,
      precioPromedio,
      porTipo,
      porProfesor,
    };
  };

  const stats = calcularEstadisticas();

  const getTipoClaseIcon = (tipo) => {
    const iconos = {
      Spinning: "🚴",
      Funcional: "💪",
      Crossfit: "🔥",
      Yoga: "🧘",
      Pilates: "🤸",
      Zumba: "💃",
    };
    return iconos[tipo] || "🏋️";
  };

  const getProfesorIcon = (profesor) => {
    return "👨‍🏫";
  };

  return (
    <div className="bg-light p-4 rounded-3 shadow-sm mb-4">
      <h3 className="text-primary fw-bold mb-4">📊 Estadísticas Detalladas</h3>

      {/* Estadísticas Generales */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center border-primary">
            <Card.Body>
              <h4 className="text-primary">{stats.total}</h4>
              <p className="mb-0 small">Total Clases</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-success">
            <Card.Body>
              <h4 className="text-success">{stats.activas}</h4>
              <p className="mb-0 small">Activas</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-warning">
            <Card.Body>
              <h4 className="text-warning">{stats.inactivas}</h4>
              <p className="mb-0 small">Inactivas</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-danger">
            <Card.Body>
              <h4 className="text-danger">{stats.suspendidas}</h4>
              <p className="mb-0 small">Suspendidas</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Métricas Adicionales */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center border-info">
            <Card.Body>
              <h4 className="text-info">{stats.cuposTotales}</h4>
              <p className="mb-0 small">Cupos Totales</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center border-secondary">
            <Card.Body>
              <h4 className="text-secondary">{stats.duracionPromedio} min</h4>
              <p className="mb-0 small">Duración Promedio</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center border-success">
            <Card.Body>
              <h4 className="text-success">${stats.precioPromedio}</h4>
              <p className="mb-0 small">Precio Promedio</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Distribución por Estado */}
      <Row className="mb-4">
        <Col md={6}>
          <h5 className="fw-bold mb-3">📈 Distribución por Estado</h5>
          <div className="mb-2">
            <div className="d-flex justify-content-between">
              <span>Activas</span>
              <span>
                {stats.activas} (
                {stats.total > 0
                  ? Math.round((stats.activas / stats.total) * 100)
                  : 0}
                %)
              </span>
            </div>
            <ProgressBar
              variant="success"
              now={stats.total > 0 ? (stats.activas / stats.total) * 100 : 0}
              className="mb-2"
            />
          </div>
          <div className="mb-2">
            <div className="d-flex justify-content-between">
              <span>Inactivas</span>
              <span>
                {stats.inactivas} (
                {stats.total > 0
                  ? Math.round((stats.inactivas / stats.total) * 100)
                  : 0}
                %)
              </span>
            </div>
            <ProgressBar
              variant="warning"
              now={stats.total > 0 ? (stats.inactivas / stats.total) * 100 : 0}
              className="mb-2"
            />
          </div>
          <div className="mb-2">
            <div className="d-flex justify-content-between">
              <span>Suspendidas</span>
              <span>
                {stats.suspendidas} (
                {stats.total > 0
                  ? Math.round((stats.suspendidas / stats.total) * 100)
                  : 0}
                %)
              </span>
            </div>
            <ProgressBar
              variant="danger"
              now={
                stats.total > 0 ? (stats.suspendidas / stats.total) * 100 : 0
              }
              className="mb-2"
            />
          </div>
        </Col>

        <Col md={6}>
          <h5 className="fw-bold mb-3">🏷️ Clases por Tipo</h5>
          {Object.entries(stats.porTipo).map(([tipo, cantidad]) => (
            <div key={tipo} className="mb-2">
              <div className="d-flex justify-content-between">
                <span>
                  {getTipoClaseIcon(tipo)} {tipo}
                </span>
                <span>{cantidad}</span>
              </div>
              <ProgressBar
                variant="primary"
                now={stats.total > 0 ? (cantidad / stats.total) * 100 : 0}
                className="mb-2"
              />
            </div>
          ))}
        </Col>
      </Row>

      {/* Profesores */}
      <Row>
        <Col md={12}>
          <h5 className="fw-bold mb-3">👨‍🏫 Clases por Profesor</h5>
          <Row>
            {Object.entries(stats.porProfesor).map(([profesor, cantidad]) => (
              <Col key={profesor} md={3} className="mb-2">
                <Card className="text-center">
                  <Card.Body>
                    <h6 className="mb-1">
                      {getProfesorIcon(profesor)} {profesor}
                    </h6>
                    <h4 className="text-primary mb-0">{cantidad}</h4>
                    <small className="text-muted">clases</small>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default EstadisticasClases;
