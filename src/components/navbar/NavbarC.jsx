import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router";

import Clima from "../clima/ClimaC";
import Swal from "sweetalert2";
import "../footer/FooterC.css";

function NavbarC() {
  // Traigo los valores del sessionStorage
  const token = sessionStorage.getItem("token");
  const rol = sessionStorage.getItem("rol");

  // Parseo los valores del sessionStorage
  const usuarioLog = token ? JSON.parse(token) : null;
  const usuarioRolLog = rol ? JSON.parse(rol) : null;

  // Obtener el nombre del usuario desde el token
  const obtenerNombreUsuario = () => {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.nombreUsuario;
    } catch (error) {
      console.error("Error al decodificar token:", error);
      return null;
    }
  };

  const nombreUsuario = obtenerNombreUsuario();

  const navigate = useNavigate();

  const logoutUser = () => {
    Swal.fire({
      title: "Confirmar Cierre de Sesión",
      text: "Vas a cerrar sesión y volver al inicio",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d3333d",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("rol");

        setTimeout(() => {
          navigate("/");
        }, 100);
      }
    });
  };

  return (
    <Navbar expand="lg" className="navbar-custom text-white shadow-sm">
      <Container fluid>
        <NavLink
          to={
            usuarioLog && usuarioRolLog === "usuario"
              ? "/user"
              : usuarioLog && usuarioRolLog === "admin"
              ? "/admin"
              : "/"
          }
          className="text-decoration-none"
        >
          <div className="d-flex align-items-center">
            <img
              src="https://res.cloudinary.com/dpy5kwico/image/upload/v1754950155/logo_vbmdlo.png"
              alt="Logo"
              className="img-circular-sm me-2"
              style={{ maxHeight: "80px", width: "auto" }}
            />
          </div>
        </NavLink>

        <Navbar.Toggle aria-controls="navbarScroll" className="border-0" />
        <Navbar.Collapse id="navbarScroll">
          <div className="ms-3 me-4">
            <Clima />
          </div>

          {/* Menú según rol */}
          {usuarioLog && usuarioRolLog === "usuario" ? (
            <Nav className="ms-auto">
              <NavLink className="nav-link fw-semibold px-3" to="/">
                Inicio
              </NavLink>
              <NavLink className="nav-link fw-semibold px-3" to="/reservar">
                Mis Clases
              </NavLink>
              <NavLink className="nav-link fw-semibold px-3" to="/mi-plan">
                Mi Plan
              </NavLink>
              <NavLink
                className="nav-link fw-semibold px-3"
                to="/sobre-nosotros"
              >
                Sobre Nosotros
              </NavLink>
              <NavLink className="nav-link fw-semibold px-3" to="/contacto">
                Contacto
              </NavLink>
            </Nav>
          ) : usuarioLog && usuarioRolLog === "admin" ? (
            <Nav className="ms-auto">
              <NavLink className="nav-link fw-semibold px-3" to="/admin">
                Inicio
              </NavLink>
              <NavLink
                className="nav-link fw-semibold px-3"
                to="/admin/usuarios"
              >
                Usuarios
              </NavLink>
              <NavLink className="nav-link fw-semibold px-3" to="/admin/clases">
                Clases
              </NavLink>
              <NavLink className="nav-link fw-semibold px-3" to="/admin/planes">
                Planes
              </NavLink>
            </Nav>
          ) : (
            <Nav className="ms-auto">
              <NavLink className="nav-link fw-semibold px-3" to="/">
                Inicio
              </NavLink>
              <NavLink
                className="nav-link fw-semibold px-3"
                to="/sobre-nosotros"
              >
                Sobre Nosotros
              </NavLink>
              <NavLink className="nav-link fw-semibold px-3" to="/contacto">
                Contacto
              </NavLink>
            </Nav>
          )}

          {/* Login / Logout */}
          {usuarioLog ? (
            <Nav className="ms-3">
              <div className="d-flex align-items-center">
                <span className="user-greeting me-3 d-none d-md-inline">
                  Hola, {nombreUsuario}
                </span>
                <span className="user-greeting me-3 d-md-none">
                  Hola,{" "}
                  {nombreUsuario?.length > 10
                    ? nombreUsuario.substring(0, 10) + "..."
                    : nombreUsuario}
                </span>
                <NavLink
                  className="nav-link fw-bold px-3 text-danger"
                  to="#"
                  onClick={logoutUser}
                >
                  Cerrar Sesión
                </NavLink>
              </div>
            </Nav>
          ) : (
            <Nav className="ms-3">
              <NavLink
                className="nav-link fw-semibold px-3"
                to="/iniciarsesion"
              >
                Iniciar Sesión
              </NavLink>
              <NavLink className="nav-link fw-semibold px-3" to="/registrarse">
                Registrarse
              </NavLink>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarC;
