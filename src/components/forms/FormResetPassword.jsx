import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { restablecerPassword } from "../../helpers/usuarios.helper";
import "./FormC.css";

const FormResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") || "";

  const [form, setForm] = useState({
    nuevaContrasenia: "",
    repetirContrasenia: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Enlace inválido",
        text: "El token no es válido. Solicita una nueva recuperación.",
      });
      return;
    }

    if (!form.nuevaContrasenia || !form.repetirContrasenia) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Debes completar ambos campos.",
      });
      return;
    }

    if (form.nuevaContrasenia !== form.repetirContrasenia) {
      Swal.fire({
        icon: "error",
        title: "Las contraseñas no coinciden",
        text: "Verificá que ambas contraseñas sean iguales.",
      });
      return;
    }

    try {
      setLoading(true);
      const respuesta = await restablecerPassword({
        token,
        nuevaContrasenia: form.nuevaContrasenia,
      });
      Swal.fire({
        icon: "success",
        title: "Contraseña actualizada",
        text: respuesta?.msg || "Ya podés iniciar sesión con tu nueva contraseña.",
      }).then(() => navigate("/iniciarsesion"));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.msg ||
          "No pudimos actualizar tu contraseña. Intenta nuevamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="formulario-page">
      <Container fluid className="form-wrapper">
        <Row className="w-100 d-flex justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <div className="form-personalizado">
              <h2 className="form-titulo">Crear nueva contraseña 🔒</h2>
              <Form className="w-100 text-center" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formNuevaPassword">
                  <Form.Label>Nueva contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="nuevaContrasenia"
                    placeholder="********"
                    value={form.nuevaContrasenia}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formRepetirPassword">
                  <Form.Label>Repetir contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="repetirContrasenia"
                    placeholder="********"
                    value={form.repetirContrasenia}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button
                  className="btn-agregar"
                  variant="primary"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Actualizando..." : "Guardar nueva contraseña"}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FormResetPassword;

