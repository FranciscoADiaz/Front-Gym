import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link, /* useNavigate */} from "react-router";
import Swal from "sweetalert2";
import { eliminarUsuario, habilitarDeshabilitarUsuario } from "../../helpers/usuarios.helper";
/* import { borrarProducto, deshabilitarOhabilitarProducto } from "../../helpers/productos.helper"; */
import "./TableC.css"; 

const TableC = ({ array, idPage, funcionReseteador }) => {

  /* const navigate = useNavigate(); */

  return (
    <Table striped bordered hover>
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
                <Button
                  variant="danger"
                  /* onClick={() => borrarProducto(element.id)} */
                >
                  Eliminar
                </Button>
                <Button
                  className="mx-2"
                  variant={element.status === "enable" ? "warning" : "info"}
                  /* onClick={() => deshabilitarOhabilitarProducto(element.id)} */
                >
                  {element.status === "enable" ? "Deshabilitar" : "Habilitar"}
                </Button>
                <Link
                  to={
                    JSON.parse(sessionStorage.getItem("usuarioLogeado"))
                      ? `/admin/products/createUpdate?id=${element.id}`
                      : "#"
                  }
                  className="btn btn-success"
                >
                  Editar
                </Link>
              </td>
            </tr>
          ) : (
            <tr key={element._id}>
              <td data-label="ID">{i + 1}</td>
              <td data-label="Nombre">{element.nombreUsuario}</td>
              <td data-label="Email">{element.emailUsuario}</td>
              <td data-label="Rol">{element.rol}</td>
              <td data-label="Teléfono">{element.telefono}</td>
              <td data-label="Plan">{element.plan}</td>
              <td data-label="Acciones">
                <Button
                  variant="danger"
                  onClick={() => {
                    Swal.fire({
                      title: "¿Seguro que deseas eliminar?",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonText: "Sí",
                      cancelButtonText: "No",
                    }).then(async (result) => {
                      if (result.isConfirmed) {
                        try {
                          await eliminarUsuario(element._id);
                          funcionReseteador();
                          Swal.fire("Eliminado!", "", "success");
                        } catch {
                          Swal.fire("Error al eliminar", "", "error");
                        }
                      }
                    });
                  }}
                >
                  Eliminar
                </Button>

                <Button
                  className="mx-2"
                  variant={
                    element.estado === "habilitado" ? "secondary" : "success"
                  }
                  onClick={async () => {
                    const accion = element.estado
                      ? "deshabilitar"
                      : "habilitar"; 
                    const mensaje = `¿${accion} usuario?`;

                    const result = await Swal.fire({
                      title: mensaje,
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonText: `Sí, ${accion}`,
                      cancelButtonText: "Cancelar",
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                    });

                    if (result.isConfirmed) {
                      try {
                        await habilitarDeshabilitarUsuario(element._id);
                        funcionReseteador(); 
                        Swal.fire(
                          `Usuario ${accion} correctamente`,
                          "",
                          "success"
                        );
                      } catch {
                        Swal.fire("Error al cambiar estado", "", "error");
                      }
                    }
                  }}
                >
                  {element.estado === "habilitado"
                    ? "Deshabilitar"
                    : "Habilitar"}
                </Button>

                <Button variant="primary">Editar</Button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </Table>
  );
};

export default TableC;
