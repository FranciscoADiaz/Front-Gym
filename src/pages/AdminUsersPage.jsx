import { Container } from "react-bootstrap";
import TableC from "../components/table/TableC";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import clientAxios from "../helpers/axios.config.helper";

const AdminUsersPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const usuarioLog = JSON.parse(sessionStorage.getItem("token"));

  const obtenerUsuarios = async () => {
    const res = await clientAxios.get("/usuarios");
    setUsuarios(res.data.usuarios);
  };

  useEffect(() => {
    obtenerUsuarios();
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
            funcionReseteador={obtenerUsuarios}
          />
        </Container>
      )}
    </>
  );
};

export default AdminUsersPage;
