
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
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
      const nuevoArray = array.filter((producto) => producto.id !== idProducto);
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
