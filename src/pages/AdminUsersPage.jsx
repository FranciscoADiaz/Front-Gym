import { Container, Button } from "react-bootstrap";
import TableC from "../components/table/TableC";
import { useEffect, useState } from "react";
import { obtenerUsuarios } from "../helpers/usuarios.helper";
import FormUsuario from "../components/forms/FormUsuario";

const AdminUsersPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const usuarioLog = JSON.parse(sessionStorage.getItem("token"));

  useEffect(() => {
    const usuarios = async () => {
      try {
        const usuariosDB = await obtenerUsuarios();
        setUsuarios(usuariosDB);
      } catch (error) {
        console.error("Error al obtener usuarios", error);
      }
    };

    usuarios();
  }, []);

  const handleShowModal = (usuario = null) => {
    setUsuarioEditando(usuario);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUsuarioEditando(null);
  };

  const handleSuccess = async () => {
    const usuariosDB = await obtenerUsuarios();
    setUsuarios(usuariosDB);
  };

  return (
    <>
      {usuarioLog && (
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
