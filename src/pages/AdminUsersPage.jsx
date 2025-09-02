import { Container, Button, Row, Col, Card } from "react-bootstrap";
import TableC from "../components/table/TableC";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { obtenerUsuarios } from "../helpers/usuarios.helper";
import FormUsuario from "../components/forms/FormUsuario";
import Swal from "sweetalert2";
import { useChangeTitle } from "../helpers/useChangeTitlePage";

const AdminUsersPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const navigate = useNavigate();

  useChangeTitle("Administrar Usuarios");

  // Verificar autenticación y rol
  const token = sessionStorage.getItem("token");
  const rol = sessionStorage.getItem("rol");

  useEffect(() => {
    // Verificar que el usuario esté logueado y sea admin
    if (!token) {
      Swal.fire("Error", "Debes iniciar sesión", "error");
      navigate("/iniciarsesion");
      return;
    }

    try {
      const rolUsuario = JSON.parse(rol);
      if (rolUsuario !== "admin") {
        Swal.fire("Error", "No tienes permisos de administrador", "error");
        navigate("/");
        return;
      }
    } catch (error) {
      console.error("Error verificando rol:", error);
      navigate("/iniciarsesion");
      return;
    }

    const cargarUsuarios = async () => {
      try {
        const usuariosDB = await obtenerUsuarios();
        setUsuarios(usuariosDB);
      } catch (error) {
        console.error("Error al obtener usuarios", error);
        Swal.fire("Error", "No se pudieron cargar los usuarios", "error");
      }
    };

    cargarUsuarios();
  }, [token, rol, navigate]);

  const handleShowModal = (usuario = null) => {
    setUsuarioEditando(usuario);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUsuarioEditando(null);
  };

  const handleSuccess = async () => {
    try {
      const usuariosDB = await obtenerUsuarios();
      setUsuarios(usuariosDB);
    } catch (error) {
      Swal.fire("Error", "No se pudieron cargar los usuarios", "error");
    }
  };

  return (
    <>
      {token && (
        <Container className="my-4">
          {/* Header */}
          <div className="bg-primary text-white p-4 rounded-3 mb-4 shadow">
            <Row className="align-items-center">
              <Col>
                <h1 className="mb-2 fw-bold">👥 Administrar Usuarios</h1>
                <p className="mb-0">Gestiona los usuarios del sistema</p>
              </Col>
              <Col xs="auto">
                <div className="d-flex align-items-center gap-3">
                  <Button
                    variant="light"
                    size="lg"
                    onClick={() => handleShowModal()}
                    className="fw-bold"
                  >
                    ➕ Nuevo Usuario
                  </Button>
                  <div className="text-end">
                    <i className="fas fa-users fs-1"></i>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          {/* Estadísticas */}
          <Row className="g-4 mb-4">
            <Col md={3}>
              <Card className="text-center shadow-sm border-0">
                <Card.Body className="p-3">
                  <i className="fas fa-users text-primary fs-2 mb-2"></i>
                  <h4 className="fw-bold mb-1">{usuarios.length}</h4>
                  <p className="text-muted small mb-0">Total Usuarios</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center shadow-sm border-0">
                <Card.Body className="p-3">
                  <i className="fas fa-user-check text-success fs-2 mb-2"></i>
                  <h4 className="fw-bold mb-1">
                    {usuarios.filter((u) => u.estado === "habilitado").length}
                  </h4>
                  <p className="text-muted small mb-0">Habilitados</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center shadow-sm border-0">
                <Card.Body className="p-3">
                  <i className="fas fa-user-times text-warning fs-2 mb-2"></i>
                  <h4 className="fw-bold mb-1">
                    {
                      usuarios.filter((u) => u.estado === "deshabilitado")
                        .length
                    }
                  </h4>
                  <p className="text-muted small mb-0">Deshabilitados</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center shadow-sm border-0">
                <Card.Body className="p-3">
                  <i className="fas fa-crown text-info fs-2 mb-2"></i>
                  <h4 className="fw-bold mb-1">
                    {usuarios.filter((u) => u.rol === "admin").length}
                  </h4>
                  <p className="text-muted small mb-0">Administradores</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Tabla de Usuarios */}
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
              <h3 className="text-primary fw-bold mb-4">Lista de Usuarios</h3>

              <TableC
                array={usuarios}
                idPage="users"
                funcionReseteador={async () => {
                  const usuariosDB = await obtenerUsuarios();
                  setUsuarios(usuariosDB);
                }}
                onEditUser={handleShowModal}
              />
            </Card.Body>
          </Card>

          <FormUsuario
            show={showModal}
            handleClose={handleCloseModal}
            usuario={usuarioEditando}
            onSuccess={handleSuccess}
          />
        </Container>
      )}
    </>
  );
};

export default AdminUsersPage;
