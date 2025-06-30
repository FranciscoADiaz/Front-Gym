import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";  // Corregido: importar desde react-router-dom
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./FormC.css";
import clientAxios, { configHeaders } from "../../helpers/axios.config.helper";
import axios from "axios";  // Se mantiene si lo necesitas en el futuro

const FormC = ({ idPage }) => {
  const navigate = useNavigate();
  const [errores, setErrores] = useState({});

  const [registro, setRegistro] = useState({
    usuario: "",
    email: "",
    contrasenia: "",
    repContrasenia: "",
    check: false,
  });
  const [inicioSesion, setInicioSesion] = useState({
    usuario: "",
    contrasenia: "",
  });

  const handleChangeFormRegister = (ev) => {
    const value = ev.target.type === "checkbox" ? ev.target.checked : ev.target.value;
    setRegistro({ ...registro, [ev.target.name]: value });
  };

  const registroUsuario = async (ev) => {
    ev.preventDefault();
    const { usuario, email, contrasenia, repContrasenia, check } = registro;
    let nuevoError = {};

    if (!usuario.trim()) {
      Swal.fire({ icon: "error", title: "ERROR", text: "Tenés que ingresar un nombre de usuario" });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      Swal.fire({ icon: "error", title: "ERROR", text: "Tenés que ingresar un correo" });
      return;
    } else if (!emailRegex.test(email)) {
      Swal.fire({ icon: "error", title: "ERROR", text: "El formato de correo no es válido" });
      return;
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!contrasenia.trim()) {
      Swal.fire({ icon: "error", title: "ERROR", text: "Tenés que ingresar una contraseña" });
      return;
    } else if (!passwordRegex.test(contrasenia)) {
      Swal.fire({ icon: "error", title: "ERROR", text: "La contraseña debe tener al menos 8 carácteres, una mayúscula y un número" });
      return;
    }
    if (!check) {
      Swal.fire({ icon: "error", title: "ERROR", text: "Tenés que aceptar los términos y condiciones" });
      return;
    }
    if (contrasenia !== repContrasenia) {
      Swal.fire({ icon: "error", title: "ERROR", text: "Las contraseñas no son iguales!" });
      return;
    }

    try {
      const res = await clientAxios.post(
        "/usuarios/registrarse",
        { nombreUsuario: usuario, emailUsuario: email, contrasenia },
        configHeaders
      );
      if (res.status === 201) {
        Swal.fire({ title: "Gracias por registrarte! 😃", text: res.data.msg, icon: "success" });
        setTimeout(() => navigate("/iniciarsesion"), 1000);
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "ERROR", text: error.response?.data?.msg || "No se pudo registrar" });
    }
  };

  const handleChangeFormLogin = (ev) => {
    setInicioSesion({ ...inicioSesion, [ev.target.name]: ev.target.value });
  };

  const iniciarSesionUsuario = async (ev) => {
    ev.preventDefault();
    const { usuario, contrasenia } = inicioSesion;
    let nuevoError = {};

    if (!usuario.trim() || !contrasenia.trim()) {
      return Swal.fire({ icon: "error", title: "ERROR", text: "Los campos usuario y contraseña no pueden estar vacíos." });
    }
    
    try {
      const res = await clientAxios.post(
        "/usuarios/iniciarsesion",
        { nombreUsuario: usuario, contrasenia },
        configHeaders
      );
      if (res.status === 200) {
        Swal.fire({ title: "Te enviamos un correo para verificar tu cuenta", text: res.data.msg, icon: "success" });
        sessionStorage.setItem("token", JSON.stringify(res.data.token));
        sessionStorage.setItem("rol", JSON.stringify(res.data.rol));
        if (res.data.rol === "admin") navigate("/admin"); else navigate("/user");
        setErrores(nuevoError);
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "ERROR", text: error.response?.data?.msg || "No se pudo iniciar sesión" });
    }
  };

  return (
    <div className="formulario-page">
      <Container fluid className="form-wrapper">
        <Row className="w-100 d-flex justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <div className="form-personalizado">
              <h2 className="form-titulo">
                {idPage === "registrarse" ? "Registrarse 🏋️‍♂️" : "Iniciar Sesión 💪"}
              </h2>
              <Form className="w-100 text-center">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Nombre Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="pepito123"
                    value={ idPage === "registrarse" ? registro.usuario : inicioSesion.usuario }
                    onChange={ idPage === "registrarse" ? handleChangeFormRegister : handleChangeFormLogin }
                    name="usuario"
                    className={ errores.usuario ? "form-control is-invalid" : "form-control" }
                  />
                  {errores.usuario && (<Form.Text className="text-danger">{errores.usuario}</Form.Text>)}
                </Form.Group>

                {idPage === "registrarse" && (
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email Usuario</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="pepito123@gmail.com"
                      value={registro.email}
                      onChange={handleChangeFormRegister}
                      className={ errores.email ? "form-control is-invalid" : "form-control" }
                    />
                    {errores.email && (<Form.Text className="text-danger">{errores.email}</Form.Text>)}
                  </Form.Group>
                )}

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="********"
                    name="contrasenia"
                    value={ idPage === "registrarse" ? registro.contrasenia : inicioSesion.contrasenia }
                    onChange={ idPage === "registrarse" ? handleChangeFormRegister : handleChangeFormLogin }
                    className={ errores.contrasenia ? "form-control is-invalid" : "form-control" }
                  />
                  {errores.contrasenia && (<Form.Text className="text-danger">{errores.contrasenia}</Form.Text>)}
                </Form.Group>

                {idPage === "registrarse" && (
                  <>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Repetir Contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="********"
                        name="repContrasenia"
                        value={registro.repContrasenia}
                        onChange={handleChangeFormRegister}
                        className={ errores.repContrasenia ? "form-control is-invalid" : "form-control" }
                      />
                      {errores.repContrasenia && (<Form.Text className="text-danger">{errores.repContrasenia}</Form.Text>)}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check
                        type="checkbox"
                        label="Aceptar términos y condiciones"
                        name="check"
                        checked={registro.check}
                        onChange={handleChangeFormRegister}
                        className={ errores.check ? "is-invalid" : "" }
                      />
                      {errores.check && (<Form.Text className="text-danger">{errores.check}</Form.Text>)}
                    </Form.Group>
                  </>
                )}
                <Button className="btn-agregar" variant="primary" type="submit" onClick={ idPage === "registrarse" ? registroUsuario : iniciarSesionUsuario }>
                  {idPage === "registrarse" ? "Registrarse" : "Iniciar Sesión"}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FormC;
