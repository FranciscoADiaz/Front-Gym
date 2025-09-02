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
import FormularioClase from "../components/forms/FormularioClase";
import clientAxios, { configHeaders } from "../helpers/axios.config.helper";
import Swal from "sweetalert2";

const AdminClasesPage = () => {
  useChangeTitle("Administrar Clases");

  const [clases, setClases] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [claseSeleccionada, setClaseSeleccionada] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarClases();
  }, []);

  const cargarClases = async () => {
    try {
      setLoading(true);
      const response = await clientAxios.get("/clases", configHeaders);
      setClases(response.data.data || []);
    } catch (error) {
      console.error("Error al cargar clases:", error);
      Swal.fire("Error", "No se pudieron cargar las clases", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCrearClase = () => {
    setClaseSeleccionada(null);
    setShowModal(true);
  };

  const handleEditarClase = (clase) => {
    setClaseSeleccionada(clase);
    setShowModal(true);
  };

  const handleEliminarClase = async (id) => {
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
        await clientAxios.delete(`/clases/${id}`, configHeaders);
        setClases(clases.filter((clase) => clase._id !== id));
        Swal.fire("Eliminada", "La clase ha sido eliminada", "success");
      } catch (error) {
        console.error("Error al eliminar clase:", error);
        Swal.fire("Error", "No se pudo eliminar la clase", "error");
      }
    }
  };

  const handleGuardarClase = async (datosClase) => {
    try {
      if (claseSeleccionada) {
        // Actualizar clase existente
        const response = await clientAxios.put(
          `/clases/${claseSeleccionada._id}`,
          datosClase,
          configHeaders
        );
        setClases(
          clases.map((clase) =>
            clase._id === claseSeleccionada._id ? response.data.data : clase
          )
        );
        Swal.fire("Actualizada", "La clase ha sido actualizada", "success");
      } else {
        // Crear nueva clase
        const response = await clientAxios.post(
          "/clases",
          datosClase,
          configHeaders
        );
        setClases([...clases, response.data.data]);
        Swal.fire("Creada", "La clase ha sido creada exitosamente", "success");
      }
      setShowModal(false);
    } catch (error) {
      console.error("Error al guardar clase:", error);
      Swal.fire("Error", "No se pudo guardar la clase", "error");
    }
  };

  const getEstadoBadge = (estado) => {
    const estados = {
      activa: { variant: "success", text: "Activa" },
      inactiva: { variant: "secondary", text: "Inactiva" },
      suspendida: { variant: "warning", text: "Suspendida" },
    };
    const config = estados[estado] || { variant: "secondary", text: estado };
    return <Badge bg={config.variant}>{config.text}</Badge>;
  };

  const getTipoClaseBadge = (tipoClase) => {
    const tipos = {
      Spinning: { variant: "primary", text: "🚴 Spinning" },
      Funcional: { variant: "info", text: "💪 Funcional" },
      Crossfit: { variant: "danger", text: "🔥 Crossfit" },
    };
    const config = tipos[tipoClase] || {
      variant: "secondary",
      text: tipoClase,
    };
    return <Badge bg={config.variant}>{config.text}</Badge>;
  };

  const formatearHorarios = (horarios) => {
    return horarios.map((h) => `${h.dia} ${h.hora}`).join(", ");
  };

  if (loading) {
    return (
      <Container className="my-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando clases...</p>
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
            <h1 className="mb-2 fw-bold">🏋️ Administrar Clases</h1>
            <p className="mb-0">Gestiona todas las clases del gimnasio</p>
          </Col>
          <Col xs="auto">
            <Button
              variant="light"
              size="lg"
              onClick={handleCrearClase}
              className="fw-bold"
            >
              ➕ Nueva Clase
            </Button>
          </Col>
        </Row>
      </div>

      {/* Lista de Clases */}
      <div className="bg-light p-4 rounded-3 shadow-sm">
        <h3 className="text-primary fw-bold mb-4">
          📋 Lista de Clases ({clases.length})
        </h3>

        {clases.length === 0 ? (
          <div className="text-center py-5">
            <div className="text-muted mb-3">
              <i className="fas fa-dumbbell fs-1"></i>
            </div>
            <p className="text-muted fs-5 mb-3">No hay clases registradas</p>
            <Button variant="primary" onClick={handleCrearClase}>
              Crear Primera Clase
            </Button>
          </div>
        ) : (
          <Row>
            {clases.map((clase) => (
              <Col key={clase._id} lg={6} xl={4} className="mb-4">
                <Card className="h-100 shadow-sm border-0">
                  <div className="position-relative">
                    <Card.Img
                      variant="top"
                      src={
                        clase.imagen ||
                        "https://res.cloudinary.com/dpy5kwico/image/upload/v1755020301/default_class.jpg"
                      }
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="position-absolute top-0 end-0 m-2">
                      {getEstadoBadge(clase.estado)}
                    </div>
                  </div>

                  <Card.Body className="d-flex flex-column">
                    <div className="mb-2">
                      {getTipoClaseBadge(clase.tipoClase)}
                    </div>

                    <Card.Title className="fw-bold mb-2">
                      {clase.nombre}
                    </Card.Title>

                    <Card.Text className="text-muted mb-3">
                      {clase.descripcion}
                    </Card.Text>

                    <div className="mb-3">
                      <small className="text-muted">
                        <strong>👥 Capacidad:</strong> {clase.capacidad}{" "}
                        personas
                        <br />
                        <strong>⏱️ Duración:</strong> {clase.duracion} min
                        <br />
                        <strong>💰 Precio:</strong> ${clase.precio}
                        <br />
                        <strong>📅 Horarios:</strong>{" "}
                        {formatearHorarios(clase.horarios)}
                      </small>
                    </div>

                    <div className="mt-auto">
                      <Row>
                        <Col>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleEditarClase(clase)}
                            className="w-100"
                          >
                            ✏️ Editar
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleEliminarClase(clase._id)}
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

      {/* Modal para Crear/Editar Clase */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {claseSeleccionada ? "✏️ Editar Clase" : "➕ Nueva Clase"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormularioClase
            clase={claseSeleccionada}
            onGuardar={handleGuardarClase}
            onCancelar={() => setShowModal(false)}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminClasesPage;
