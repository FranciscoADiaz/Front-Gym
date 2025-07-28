import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router";
import { Container, Row, Col, Form, Button} from "react-bootstrap";
import "./FormC.css";
import clientAxios, { configHeaders } from "../../helpers/axios.config.helper";

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
    const value =
      ev.target.type === "checkbox" ? ev.target.checked : ev.target.value;
    setRegistro({ ...registro, [ev.target.name]: value });
  };

  const registroUsuario = async (ev) => {
    ev.preventDefault();
    const { usuario, email, contrasenia, repContrasenia, check } = registro;
    let nuevoError = {};

    if (!usuario.trim()) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "Tenés que ingresar un nombre de usuario",
      });
      return;
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "Tenés que ingresar un correo",
      });
      return;
    } else if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "El formato de correo no es válido",
      });
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!contrasenia.trim()) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "Tenés que ingresar una contraseña",
      });
      return;
    } else if (!passwordRegex.test(contrasenia)) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "La contraseña debe tener al menos 8 carácteres, una mayúscula y un número",
      });
      return;
    }

    if (!check) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "Tenés que aceptar los términos y condiciones",
      });
      return;
    }

    if (usuario && email && contrasenia && repContrasenia && check) {
      if (contrasenia === repContrasenia) {
        const res = await clientAxios.post("/usuarios/registrarse",
          {
            nombreUsuario: usuario,
            emailUsuario: email,
            contrasenia,
          });

        if (res.status === 201) {
          Swal.fire({
            title: "Gracias por registrarte! 😃",
            text: ``,
            icon: "success",
          });

          setTimeout(() => {
            navigate("/iniciarsesion");
          }, 1000);
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "ERROR",
          text: "Las contraseñas no son iguales!",
        });
      }
    }
    setErrores(nuevoError);
  };


  const handleChangeFormLogin = (ev) => {
    setInicioSesion({ ...inicioSesion, [ev.target.name]: ev.target.value });
  };



 const iniciarSesionUsuario = async (ev) => {
  ev.preventDefault();
  const { usuario, contrasenia } = inicioSesion;

  if (!usuario || !contrasenia) {
    return Swal.fire({
      icon: "error",
      title: "ERROR",
      text: "Los campos usuario y contraseña no pueden estar vacíos.",
    });
  }

  try {
    const res = await clientAxios.post(
      "/usuarios/iniciarsesion",
      {
        nombreUsuario: usuario, 
        contrasenia,
      },
      configHeaders
    );

    if (res.status === 200) {
      Swal.fire({
        title: "Inicio de sesión exitoso",
        text: ``,
        icon: "success",
      });

      sessionStorage.setItem("token", JSON.stringify(res.data.token));
      sessionStorage.setItem("rol", JSON.stringify(res.data.rolUsuario));

      if (res.data.rolUsuario === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    }
  } catch (error) {
    // Mostrar mensaje del backend o un mensaje genérico
    Swal.fire({
      icon: "error",
      title: "ERROR",
      text: error.response?.data?.msg || "No se pudo iniciar sesión. Verificá tus datos.",
    });
    console.error("Error al iniciar sesión:", error);
  }
};

  

  return (
    <div className="formulario-page">
      <Container fluid className="form-wrapper">
        <Row className="w-100 d-flex justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <div className="form-personalizado">
              <h2 className="form-titulo">
                {idPage === "registrarse"
                  ? "Registrarse 🏋️‍♂️"
                  : idPage === "recuperarcontrasenia"
                  ? "Recuperar Contraseña 🔑"
                  : "Iniciar Sesión 💪"}
              </h2>
              {idPage === "recuperarcontrasenia" ? (
                <Form className="w-100 text-center">
                  <Form.Group className="mb-3" controlId="formRecuperarEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Ingresa tu correo"
                      value={registro.email}
                      onChange={handleChangeFormRegister}
                    />
                    <Form.Text className="text-muted">
                      Ingresa tu correo para recuperar la contraseña
                    </Form.Text>
                  </Form.Group>
                  <Button
                    className="btn-agregar"
                    variant="primary"
                    type="button"
                    onClick={() => {
                      if (!registro.email.trim()) {
                        Swal.fire({
                          icon: "error",
                          title: "ERROR",
                          text: "Tenés que ingresar un correo",
                        });
                        return;
                      }
                    }}
                  >
                    Recuperar
                  </Button>
                </Form>
              ) : (
                <Form className="w-100 text-center">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nombre Usuario</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingresa tu usuario"
                      value={
                        idPage === "registrarse"
                          ? registro.usuario
                          : inicioSesion.usuario
                      }
                      onChange={
                        idPage === "registrarse"
                          ? handleChangeFormRegister
                          : handleChangeFormLogin
                      }
                      name="usuario"
                      className={
                        errores.usuario
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                    />
                    {errores.usuario && (
                      <Form.Text className="text-danger">
                        El campo usuario es obligatorio
                      </Form.Text>
                    )}
                  </Form.Group>

                  {idPage === "registrarse" && (
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email Usuario</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Ingresa tu correo"
                        value={registro.email}
                        onChange={handleChangeFormRegister}
                      />
                      <Form.Text className="text-muted">
                        Nunca compartiremos tu e-mail con nadie
                      </Form.Text>
                    </Form.Group>
                  )}

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="********"
                      name="contrasenia"
                      value={
                        idPage === "registrarse"
                          ? registro.contrasenia
                          : inicioSesion.contrasenia
                      }
                      onChange={
                        idPage === "registrarse"
                          ? handleChangeFormRegister
                          : handleChangeFormLogin
                      }
                    />
                  </Form.Group>

                  {idPage === "registrarse" && (
                    <>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Repetir Contraseña</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="********"
                          name="repContrasenia"
                          value={registro.repContrasenia}
                          onChange={handleChangeFormRegister}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <Form.Check
                          type="checkbox"
                          label="Aceptar términos y condiciones"
                          name="check"
                          checked={registro.check}
                          onChange={handleChangeFormRegister}
                        />
                      </Form.Group>
                    </>
                  )}
                  <Button
                    className="btn-agregar"
                    variant="primary"
                    type="submit"
                    onClick={
                      idPage === "registrarse"
                        ? registroUsuario
                        : iniciarSesionUsuario
                    }
                  >
                    {idPage === "registrarse"
                      ? "Registrarse"
                      : "Iniciar Sesión"}
                  </Button>
                  <div className="mt-2">
                    {idPage === "registrarse" ? (
                      <Link to="/iniciarsesion">
                        ¿Ya tenés una cuenta? Iniciar sesión
                      </Link>
                    ) : (
                      <Link to="/recuperarcontrasenia">
                        ¿Olvidaste tu contraseña?
                      </Link>
                    )}
                  </div>
                </Form>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FormC;
