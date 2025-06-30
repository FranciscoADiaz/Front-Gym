import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./FormC.css";
import clientAxios from "../../helpers/axios.config.helper";

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
  const [login, setLogin] = useState({ usuario: "", contrasenia: "" });

  const handleChange = (ev, tipo) => {
    const valor = ev.target.type === "checkbox" ? ev.target.checked : ev.target.value;
    if (tipo === "registro") {
      setRegistro({ ...registro, [ev.target.name]: valor });
    } else {
      setLogin({ ...login, [ev.target.name]: valor });
    }
  };

  const registroUsuario = async (ev) => {
    ev.preventDefault();
    const { usuario, email, contrasenia, repContrasenia, check } = registro;

    // Validaciones
    if (!usuario.trim()) {
      setErrores({ usuario: "Tenés que ingresar un nombre de usuario" });
      return Swal.fire("ERROR", "Tenés que ingresar un nombre de usuario", "error");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setErrores({ email: "Tenés que ingresar un correo" });
      return Swal.fire("ERROR", "Tenés que ingresar un correo", "error");
    } else if (!emailRegex.test(email)) {
      setErrores({ email: "El formato de correo no es válido" });
      return Swal.fire("ERROR", "El formato de correo no es válido", "error");
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!contrasenia.trim()) {
      setErrores({ contrasenia: "Tenés que ingresar una contraseña" });
      return Swal.fire("ERROR", "Tenés que ingresar una contraseña", "error");
    } else if (!passwordRegex.test(contrasenia)) {
      setErrores({ contrasenia: "La contraseña debe tener al menos 8 carácteres, una mayúscula y un número" });
      return Swal.fire(
        "ERROR",
        "La contraseña debe tener al menos 8 carácteres, una mayúscula y un número",
        "error"
      );
    }
    if (contrasenia !== repContrasenia) {
      setErrores({ repContrasenia: "Las contraseñas no coinciden" });
      return Swal.fire("ERROR", "Las contraseñas no coinciden", "error");
    }
    if (!check) {
      setErrores({ check: "Debes aceptar los términos y condiciones" });
      return Swal.fire("ERROR", "Debes aceptar los términos y condiciones", "error");
    }

    try {
      const res = await clientAxios.post(
        "/usuarios/registrarse",
        {
          nombreUsuario: usuario,
          emailUsuario: email,
          contrasenia,
        }
      );
      Swal.fire("¡Registrado! 😃", res.data.msg, "success");
      setTimeout(() => navigate("/iniciarsesion"), 1000);
    } catch (error) {
      Swal.fire(
        "Error al registrar",
        error.response?.data?.msg || "Intenta de nuevo más tarde",
        "error"
      );
    }
  };

  const iniciarSesionUsuario = async (ev) => {
    ev.preventDefault();
    const { usuario, contrasenia } = login;
    if (!usuario.trim() || !contrasenia.trim()) {
      return Swal.fire("ERROR", "Usuario y contraseña son obligatorios", "error");
    }
    try {
      const res = await clientAxios.post(
        "/usuarios/iniciarsesion",
        {
          nombreUsuario: usuario,
          contrasenia,
        }
      );
      Swal.fire("¡Bienvenido!", res.data.msg, "success");
      sessionStorage.setItem("token", JSON.stringify(res.data.token));
      sessionStorage.setItem("rol", JSON.stringify(res.data.rol));
      navigate(res.data.rol === "admin" ? "/admin" : "/user");
    } catch (error) {
      Swal.fire(
        "Error al iniciar sesión",
        error.response?.data?.msg || "Credenciales inválidas",
        "error"
      );
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
              <Form
                onSubmit={
                  idPage === "registrarse" ? registroUsuario : iniciarSesionUsuario
                }
                className="w-100 text-center"
              >
                <Form.Group className="mb-3">
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    name="usuario"
                    placeholder="pepito123"
                    value={
                      idPage === "registrarse" ? registro.usuario : login.usuario
                    }
                    onChange={(ev) =>
                      handleChange(
                        ev,
                        idPage === "registrarse" ? "registro" : "login"
                      )
                    }
                    isInvalid={!!errores.usuario}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.usuario}
                  </Form.Control.Feedback>
                </Form.Group>

                {idPage === "registrarse" && (
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="pepito@example.com"
                      value={registro.email}
                      onChange={(ev) => handleChange(ev, "registro")}
                      isInvalid={!!errores.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errores.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                )}

                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="contrasenia"
                    placeholder="********"
                    value={
                      idPage === "registrarse"
                        ? registro.contrasenia
                        : login.contrasenia
                    }
                    onChange={(ev) =>
                      handleChange(
                        ev,
                        idPage === "registrarse" ? "registro" : "login"
                      )
                    }
                    isInvalid={!!errores.contrasenia}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.contrasenia}
                  </Form.Control.Feedback>
                </Form.Group>

                {idPage === "registrarse" && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Repetir Contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        name="repContrasenia"
                        placeholder="********"
                        value={registro.repContrasenia}
                        onChange={(ev) => handleChange(ev, "registro")}
                        isInvalid={!!errores.repContrasenia}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errores.repContrasenia}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="checkbox"
                        label="Acepto términos y condiciones"
                        name="check"
                        checked={registro.check}
                        onChange={(ev) => handleChange(ev, "registro")}
                        isInvalid={!!errores.check}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errores.check}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </>
                )}

                <Button variant="primary" type="submit">
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
