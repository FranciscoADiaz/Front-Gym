import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router";

function NavbarC() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary ">
        <Container fluid>
          <NavLink to="/">
            <img src="freepik__background__34329.png" alt="" width="120" />
          </NavLink>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <NavLink className="nav-link" to="sobre">
                Sobre nosotros
              </NavLink>
              <NavLink className="nav-link" to="iniciar">
                Iniciar sesion
              </NavLink>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavLink className="nav-link" to="#action3">
                  Action
                </NavLink>
                <NavLink className="nav-link" to="#action4">
                  Another action
                </NavLink>
                <NavDropdown.Divider />
                <NavLink className="nav-link" to="#action5">
                  Something else here
                </NavLink>
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Buscar"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Buscador</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarC;
