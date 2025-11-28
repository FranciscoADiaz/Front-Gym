import { Button, Badge } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router";
import {
  eliminarUsuario,
  habilitarDeshabilitarUsuario,
} from "../../helpers/usuarios.helper";
import { getUserInfo } from "../../helpers/auth.helper";
import { confirmDelete, showSuccess, showError, showWarning, confirmAction } from "../../helpers/swal.helper";
import "./TableC.css";

const TableC = ({ array, idPage, funcionReseteador, onEditUser }) => {
  // Obtener el usuario logueado del token JWT usando el helper
  const usuarioLog = getUserInfo();

  const getEstadoBadge = (estado) => {
    return estado === "habilitado" ? (
      <Badge bg="success">Habilitado</Badge>
    ) : (
      <Badge bg="secondary">Deshabilitado</Badge>
    );
  };

  const getRolBadge = (rol) => {
    return rol === "admin" ? (
      <Badge bg="danger">Admin</Badge>
    ) : (
      <Badge bg="primary">Usuario</Badge>
    );
  };

  const getPlanBadge = (plan) => {
    if (!plan || plan === "Sin plan") {
      return (
        <Badge bg="light" text="dark">
          Sin plan
        </Badge>
      );
    }

    const planColors = {
      "SOLO CLASES": "info",
      Completo: "success",
      Musculación: "secondary",
    };

    return <Badge bg={planColors[plan] || "primary"}>{plan}</Badge>;
  };

  const handleEliminarUsuario = async (element) => {
    // Verificar si el usuario logueado está intentando eliminarse a sí mismo
    if (usuarioLog && usuarioLog.idUsuario === element._id) {
      showWarning(
        "No puedes eliminarte a ti mismo",
        "Por seguridad, no puedes eliminar tu propia cuenta de administrador"
      );
      return;
    }

    const result = await confirmDelete("¿Seguro que deseas eliminar?", "");
    if (result.isConfirmed) {
      try {
        await eliminarUsuario(element._id);
        funcionReseteador();
        showSuccess("Eliminado!", "El usuario ha sido eliminado correctamente");
      } catch {
        showError("Error al eliminar", "No se pudo eliminar el usuario");
      }
    }
  };

  return (
    <div className="table-responsive">
      <Table className="table-modern">
        <thead>
          {idPage === "products" ? (
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Precio</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          ) : (
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Teléfono</th>
              <th>Plan</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          )}
        </thead>
        <tbody>
          {array.map((element, i) =>
            idPage === "products" ? (
              <tr key={element._id}>
                <td data-label="ID">{i + 1}</td>
                <td data-label="Nombre" className="w-25">
                  {element.nombre}
                </td>
                <td data-label="Descripcion" className="w-25">
                  {element.descripcion}
                </td>
                <td data-label="Precio" className="text-center">
                  ${element.precio}
                </td>
                <td data-label="Imagen">
                  <img
                    src={
                      element.imagen.includes("public")
                        ? `${import.meta.env.VITE_URL_BACK_LOCAL}/${
                            element.imagen
                          }`
                        : element.imagen
                    }
                    alt={element.description}
                    width={50}
                  />
                </td>
                <td data-label="Acciones">
                  <Button variant="danger" size="sm">
                    Eliminar
                  </Button>
                  <Button
                    className="mx-2"
                    variant={element.status === "enable" ? "warning" : "info"}
                    size="sm"
                  >
                    {element.status === "enable" ? "Deshabilitar" : "Habilitar"}
                  </Button>
                  <Link
                    to={
                      JSON.parse(sessionStorage.getItem("usuarioLogeado"))
                        ? `/admin/products/createUpdate?id=${element.id}`
                        : "#"
                    }
                    className="btn btn-success btn-sm"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ) : (
              <tr key={element._id}>
                <td data-label="ID">{i + 1}</td>
                <td data-label="Nombre">
                  <div className="d-flex align-items-center">
                    <div
                      className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{ width: "40px", height: "40px" }}
                    >
                      <i className="fas fa-user"></i>
                    </div>
                    <div>
                      <div className="fw-bold">{element.nombreUsuario}</div>
                    </div>
                  </div>
                </td>
                <td data-label="Email">
                  <span className="text-muted">{element.emailUsuario}</span>
                </td>
                <td data-label="Rol">{getRolBadge(element.rol)}</td>
                <td data-label="Teléfono">
                  <span className="text-muted">
                    {element.telefono || "N/A"}
                  </span>
                </td>
                <td data-label="Plan">{getPlanBadge(element.plan)}</td>
                <td data-label="Estado">{getEstadoBadge(element.estado)}</td>
                <td data-label="Acciones">
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => onEditUser && onEditUser(element)}
                      title="Editar usuario"
                      aria-label="Editar usuario"
                    >
                      <i className="fas fa-edit me-2"></i>
                      <span>Editar</span>
                    </Button>

                    <Button
                      variant={
                        element.estado === "habilitado"
                          ? "outline-warning"
                          : "outline-success"
                      }
                      size="sm"
                      onClick={async () => {
                        const accion =
                          element.estado === "habilitado"
                            ? "deshabilitar"
                            : "habilitar";
                        const mensaje = `¿${accion} usuario?`;

                        const result = await confirmAction(
                          mensaje,
                          "",
                          `Sí, ${accion}`,
                          "Cancelar"
                        );

                        if (result.isConfirmed) {
                          try {
                            await habilitarDeshabilitarUsuario(element._id);
                            funcionReseteador();
                            showSuccess(
                              `Usuario ${accion} correctamente`,
                              ""
                            );
                          } catch {
                            showError("Error al cambiar estado", "");
                          }
                        }
                      }}
                      title={
                        element.estado === "habilitado"
                          ? "Deshabilitar usuario"
                          : "Habilitar usuario"
                      }
                      aria-label={
                        element.estado === "habilitado"
                          ? "Deshabilitar usuario"
                          : "Habilitar usuario"
                      }
                    >
                      <i
                        className={`fas fa-${
                          element.estado === "habilitado"
                            ? "ban me-2"
                            : "check me-2"
                        }`}
                      ></i>
                      <span>
                        {element.estado === "habilitado"
                          ? "Deshabilitar"
                          : "Habilitar"}
                      </span>
                    </Button>

                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleEliminarUsuario(element)}
                      title={
                        usuarioLog && usuarioLog.idUsuario === element._id
                          ? "No puedes eliminarte a ti mismo"
                          : "Eliminar usuario"
                      }
                      aria-label="Eliminar usuario"
                      disabled={
                        usuarioLog && usuarioLog.idUsuario === element._id
                      }
                      className={
                        usuarioLog && usuarioLog.idUsuario === element._id
                          ? "opacity-50"
                          : ""
                      }
                    >
                      <i className="fas fa-trash me-2"></i>
                      <span>Eliminar</span>
                    </Button>
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default TableC;
