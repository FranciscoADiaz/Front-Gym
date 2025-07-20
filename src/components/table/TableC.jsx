import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { eliminarUsuario, toggleUsuario } from "../../helpers/usuarios.helper";

const TableC = ({ array, idPage, funcionReseteador }) => {
  const navigate = useNavigate();

  const borrarProducto = (idProducto) => {
    const usuarioLog = JSON.parse(sessionStorage.getItem("token"));

    if (!usuarioLog) {
      Swal.fire({
        title: "Debes iniciar sesion!",
        icon: "info",
      });

      setTimeout(() => {
        navigate("/login");
      }, 500);
      return;
    }

    Swal.fire({
      title: "Estas seguro de que quieres eliminar este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, estoy seguro!",
      cancelButtonText: "NO, no quiero eliminarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        const nuevoArray = array.filter(
          (producto) => producto.id !== idProducto
        );
        localStorage.setItem("productos", JSON.stringify(nuevoArray));

        funcionReseteador();

        Swal.fire({
          title: "Producto eliminado con exito!",
          icon: "success",
        });
      }
    });
  };

  const deshabilitarOhabilitarProducto = (idProducto) => {
    const usuarioLog = JSON.parse(sessionStorage.getItem("token"));

    if (!usuarioLog) {
      Swal.fire({
        title: "Debes iniciar sesion!",
        icon: "info",
      });

      setTimeout(() => {
        navigate("/login");
      }, 500);
      return;
    }

    const producto = array.find((producto) => producto.id === idProducto);

    Swal.fire({
      title: `Estas seguro de que quieres ${
        producto.status === "enable" ? "deshabilitar" : "habilitar"
      } este producto?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, estoy seguro!",
      cancelButtonText: "NO, no quiero eliminarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        producto.status = producto.status === "enable" ? "disabled" : "enable";
        localStorage.setItem("productos", JSON.stringify(array));

        funcionReseteador();

        Swal.fire({
          title: `Producto ${
            producto.status === "enable" ? "habilitado" : "deshabilitado"
          }  con exito!`,
          icon: "success",
        });
      }
    });
  };

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
              <td>{i + 1}</td>
              <td className="w-25">{element.nombre}</td>
              <td className="w-25">{element.descripcion}</td>
              <td className="text-center">${element.precio}</td>
              <td>
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
              <td>
                <Button
                  variant="danger"
                  onClick={() => borrarProducto(element.id)}
                >
                  Eliminar
                </Button>
                <Button
                  className="mx-2"
                  variant={element.status === "enable" ? "warning" : "info"}
                  onClick={() => deshabilitarOhabilitarProducto(element.id)}
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
              <td>{i + 1}</td>
              <td>{element.nombreUsuario}</td>
              <td className="w-25">{element.emailUsuario}</td>
              <td>{element.rol}</td>
              <td>
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
                          funcionReseteador(); // para que refresque la tabla
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
                  variant={element.estado === "habilitado" ? "warning" : "info"}
                  onClick={async () => {
                    try {
                      await toggleUsuario(element._id);
                      funcionReseteador();
                      Swal.fire("Estado cambiado!", "", "success");
                    } catch {
                      Swal.fire("Error al cambiar estado", "", "error");
                    }
                  }}
                >
                  {element.estado === "habilitado"
                    ? "Deshabilitar"
                    : "Habilitar"}
                </Button>

                <Button variant="success">Editar</Button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </Table>
  );
};

export default TableC;
