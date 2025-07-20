import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate} from "react-router";
import logo from "../../assets/logo.png";

function NavbarC() {
  const usuarioLog = JSON.parse(sessionStorage.getItem('token'))
    const usuarioRolLog = JSON.parse(sessionStorage.getItem('rol'))
    const navigate = useNavigate()
  
    const logoutUser = () => {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('rol')
  
      setTimeout(() => {
        navigate('/')
      }, 100);
    }
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary ">
        <Container fluid>
          <NavLink
            to={
              usuarioLog && usuarioRolLog === "usuario"
                ? "/user"
                : usuarioLog && usuarioRolLog === "admin"
                ? "/admin"
                : "/"
            }
          >
            <img src={logo} alt="Logo" width="120" />
          </NavLink>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
          
                      {
                        usuarioLog && usuarioRolLog === 'usuario' ?
                          <Nav className="ms-auto">
                            <NavLink className='nav-link' to="/">Inicio</NavLink>
                            <NavLink className='nav-link' to="/reservar">Mis Clases</NavLink>
                            <NavLink className='nav-link' to="/planes">Planes</NavLink>
                          </Nav>
                          :
                          usuarioLog && usuarioRolLog === 'admin' ?
                            <Nav className="ms-auto">
                              <NavLink className='nav-link' to="/admin">Inicio</NavLink>
                              <NavLink className='nav-link' to="/admin/usuarios">Administrar Usuarios</NavLink>
                              <NavLink className='nav-link' to="/admin/clases">Administrar Clases</NavLink>
                            </Nav>
                            :
                            <Nav className="ms-auto">
                              <NavLink className='nav-link' to="/">Inicio</NavLink>
                              <NavLink className='nav-link' to="/sobrenosotros">Sobre Nosotros</NavLink>
                              <NavLink className='nav-link' to="/contacto">Contacto</NavLink>
                            </Nav>
                      }
                      {
                        usuarioLog ?
                          <Nav className="ms-auto">
                            <NavLink className='nav-link' to="#" onClick={logoutUser}>Cerrar Sesion</NavLink>
          
                          </Nav>
                          :
                          <Nav className="ms-auto">
                            <NavLink className='nav-link' to="/iniciarsesion">Iniciar Sesion</NavLink>
                            <NavLink className='nav-link' to="/registrarse">Registrarse</NavLink>
                          </Nav>
                      }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarC;
