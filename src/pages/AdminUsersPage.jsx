import { Container } from "react-bootstrap";
import TableC from "../components/table/TableC";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { obtenerUsuarios } from "../helpers/usuarios.helper";

const AdminUsersPage = () => {
  const [usuarios, setUsuarios] = useState([]);
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

  return (
    <>
      {usuarioLog && (
        <Container className="my-5">
          <div className="d-flex justify-content-end mb-3">
            <Link className="btn btn-primary">Agregar Usuario</Link>
          </div>
          <TableC
            array={usuarios}
            idPage="users"
            funcionReseteador={async () => {
              const usuariosDB = await obtenerUsuarios();
              setUsuarios(usuariosDB);
            }}
          />
        </Container>
      )}
    </>
  );
};

export default AdminUsersPage;
