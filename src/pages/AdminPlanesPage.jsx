import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Modal,
} from "react-bootstrap";
import { useChangeTitle } from "../helpers/useChangeTitlePage";
import FormularioPlan from "../components/forms/FormularioPlan";
import clientAxios, { configHeaders } from "../helpers/axios.config.helper";
import Swal from "sweetalert2";

const AdminPlanesPage = () => {
  useChangeTitle("Administrar Planes");

  const [planes, setPlanes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [planSeleccionado, setPlanSeleccionado] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarPlanes();
  }, []);

  const cargarPlanes = async () => {
    try {
      setLoading(true);
      const response = await clientAxios.get("/planes", configHeaders);
      setPlanes(response.data.data || []);
    } catch (error) {
      console.error("Error al cargar planes:", error);
      Swal.fire("Error", "No se pudieron cargar los planes", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCrearPlan = () => {
    setPlanSeleccionado(null);
    setShowModal(true);
  };

  const handleEditarPlan = (plan) => {
    setPlanSeleccionado(plan);
    setShowModal(true);
  };

  const handleEliminarPlan = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await clientAxios.delete(`/planes/${id}`, configHeaders);
        setPlanes(planes.filter((plan) => plan._id !== id));
        Swal.fire("Eliminado", "El plan ha sido eliminado", "success");
      } catch (error) {
        console.error("Error al eliminar plan:", error);
        Swal.fire("Error", "No se pudo eliminar el plan", "error");
      }
    }
  };

  const handleGuardarPlan = async (datosPlan) => {
    try {
      if (planSeleccionado) {
        // Actualizar plan existente
        const response = await clientAxios.put(
          `/planes/${planSeleccionado._id}`,
          datosPlan,
          configHeaders
        );
        setPlanes(
          planes.map((plan) =>
            plan._id === planSeleccionado._id ? response.data.data : plan
          )
        );
        Swal.fire("Actualizado", "El plan ha sido actualizado", "success");
      } else {
        // Crear nuevo plan
        const response = await clientAxios.post(
          "/planes",
          datosPlan,
          configHeaders
        );
        setPlanes([...planes, response.data.data]);
        Swal.fire("Creado", "El plan ha sido creado exitosamente", "success");
      }
      setShowModal(false);
    } catch (error) {
      console.error("Error al guardar plan:", error);
      Swal.fire("Error", "No se pudo guardar el plan", "error");
    }
  };

  const getEstadoBadge = (estado) => {
    const estados = {
      activo: { variant: "success", text: "Activo" },
      inactivo: { variant: "secondary", text: "Inactivo" },
    };
    const config = estados[estado] || { variant: "secondary", text: estado };
    return <Badge bg={config.variant}>{config.text}</Badge>;
  };

  const getTipoPlanBadge = (tipo) => {
    const tipos = {
      Musculación: { variant: "primary", text: "💪 Musculación" },
      Funcional: { variant: "info", text: "🏃 Funcional" },
      Completo: { variant: "danger", text: "🏋️ Completo" },
    };
    const config = tipos[tipo] || {
      variant: "secondary",
      text: tipo,
    };
    return <Badge bg={config.variant}>{config.text}</Badge>;
  };

  if (loading) {
    return (
      <Container className="my-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando planes...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      {/* Header */}
      <div className="bg-primary text-white p-4 rounded-3 mb-4 shadow">
        <Row className="align-items-center">
          <Col>
            <h1 className="mb-2 fw-bold">💎 Administrar Planes</h1>
            <p className="mb-0">Gestiona todos los planes del gimnasio</p>
          </Col>
          <Col xs="auto">
            <Button
              variant="light"
              size="lg"
              onClick={handleCrearPlan}
              className="fw-bold"
            >
              ➕ Nuevo Plan
            </Button>
          </Col>
        </Row>
      </div>

      {/* Lista de Planes */}
      <div className="bg-light p-4 rounded-3 shadow-sm">
        <h3 className="text-primary fw-bold mb-4">
          📋 Lista de Planes ({planes.length})
        </h3>

        {planes.length === 0 ? (
          <div className="text-center py-5">
            <div className="text-muted mb-3">
              <i className="fas fa-gem fs-1"></i>
            </div>
            <p className="text-muted fs-5 mb-3">No hay planes registrados</p>
            <Button variant="primary" onClick={handleCrearPlan}>
              Crear Primer Plan
            </Button>
          </div>
        ) : (
          <Row>
            {planes.map((plan) => (
              <Col key={plan._id} lg={6} xl={4} className="mb-4">
                <Card className="h-100 shadow-sm border-0">
                  <div className="position-relative">
                    <Card.Img
                      variant="top"
                      src={
                        plan.imagen ||
                        "https://res.cloudinary.com/dpy5kwico/image/upload/v1755020301/default_plan.jpg"
                      }
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="position-absolute top-0 end-0 m-2">
                      {getEstadoBadge(plan.estado)}
                    </div>
                  </div>

                  <Card.Body className="d-flex flex-column">
                    <div className="mb-2">{getTipoPlanBadge(plan.tipo)}</div>

                    <Card.Title className="fw-bold mb-2">
                      {plan.nombre}
                    </Card.Title>

                    <Card.Text className="text-muted mb-3">
                      {plan.descripcion}
                    </Card.Text>

                    <div className="mb-3">
                      <small className="text-muted">
                        <strong>💰 Precio:</strong> ${plan.precio}
                        <br />
                        <strong>⏱️ Duración:</strong> {plan.duracion} mes
                        {plan.duracion > 1 ? "es" : ""}
                        <br />
                        <strong>✨ Características:</strong>{" "}
                        {plan.caracteristicas.length}
                      </small>
                    </div>

                    {/* Características */}
                    {plan.caracteristicas.length > 0 && (
                      <div className="mb-3">
                        <small className="text-muted">
                          <strong>Incluye:</strong>
                        </small>
                        <div className="mt-1">
                          {plan.caracteristicas
                            .slice(0, 3)
                            .map((caract, index) => (
                              <Badge
                                key={index}
                                bg="light"
                                text="dark"
                                className="me-1 mb-1"
                              >
                                {caract}
                              </Badge>
                            ))}
                          {plan.caracteristicas.length > 3 && (
                            <Badge bg="light" text="dark">
                              +{plan.caracteristicas.length - 3} más
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="mt-auto">
                      <Row>
                        <Col>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleEditarPlan(plan)}
                            className="w-100"
                          >
                            ✏️ Editar
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleEliminarPlan(plan._id)}
                            className="w-100"
                          >
                            🗑️ Eliminar
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>

      {/* Modal para Crear/Editar Plan */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {planSeleccionado ? "✏️ Editar Plan" : "➕ Nuevo Plan"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormularioPlan
            plan={planSeleccionado}
            onGuardar={handleGuardarPlan}
            onCancelar={() => setShowModal(false)}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminPlanesPage;
