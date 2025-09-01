import { Container, Button } from "react-bootstrap";
import TableC from "../components/table/TableC";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { obtenerUsuarios } from "../helpers/usuarios.helper";
import FormUsuario from "../components/forms/FormUsuario";
import Swal from "sweetalert2";

const AdminUsersPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const navigate = useNavigate();

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
    console.log("=== CERRANDO MODAL ===");
    setShowModal(false);
    setUsuarioEditando(null);
    console.log("Modal cerrado, usuarioEditando reseteado");
  };

  const handleSuccess = async () => {
    console.log("=== ACTUALIZANDO LISTA DE USUARIOS ===");
    try {
      const usuariosDB = await obtenerUsuarios();
      console.log("Nueva lista de usuarios:", usuariosDB);
      setUsuarios(usuariosDB);
    } catch (error) {
      console.error("Error al actualizar lista:", error);
    }
  };

  return (
    <>
      {token && (
        <Container className="my-5">
          <div className="d-flex justify-content-end mb-3">
            <Button
              className="btn btn-primary"
              onClick={() => handleShowModal()}
            >
              Agregar Usuario
            </Button>
          </div>
          <TableC
            array={usuarios}
            idPage="users"
            funcionReseteador={async () => {
              const usuariosDB = await obtenerUsuarios();
              setUsuarios(usuariosDB);
            }}
            onEditUser={handleShowModal}
          />

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
