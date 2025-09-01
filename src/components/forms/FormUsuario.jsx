import { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { crearUsuario, actualizarUsuario } from "../../helpers/usuarios.helper";

const FormUsuario = ({ show, handleClose, usuario = null, onSuccess }) => {
  const [formData, setFormData] = useState({
    nombreUsuario: "",
    emailUsuario: "",
    contrasenia: "",
    rol: "usuario",
    telefono: "",
    plan: "Sin plan",
  });

  const [loading, setLoading] = useState(false);

  // Si es edición, cargar datos del usuario
  useEffect(() => {
    if (usuario) {
      setFormData({
        nombreUsuario: usuario.nombreUsuario || "",
        emailUsuario: usuario.emailUsuario || "",
        contrasenia: "", // No mostrar contraseña en edición
        rol: usuario.rol || "usuario",
        telefono: usuario.telefono || "",
        plan: usuario.plan || "Sin plan",
      });
    } else {
      // Resetear formulario para nuevo usuario
      setFormData({
        nombreUsuario: "",
        emailUsuario: "",
        contrasenia: "",
        rol: "usuario",
        telefono: "",
        plan: "Sin plan",
      });
    }
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (usuario) {
        // Editar usuario existente
        await actualizarUsuario(usuario._id, formData);
        Swal.fire("¡Éxito!", "Usuario actualizado correctamente", "success");
      } else {
        // Crear nuevo usuario
        await crearUsuario(formData);
        Swal.fire("¡Éxito!", "Usuario creado correctamente", "success");
      }

      onSuccess(); // Actualizar la lista
      handleClose();
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.msg || "Ocurrió un error",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const isEditing = !!usuario;

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {isEditing ? "Editar Usuario" : "Agregar Nuevo Usuario"}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre de Usuario *</Form.Label>
                <Form.Control
                  type="text"
                  name="nombreUsuario"
                  value={formData.nombreUsuario}
                  onChange={handleChange}
                  required
                  placeholder="Ingrese nombre de usuario"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  type="email"
                  name="emailUsuario"
                  value={formData.emailUsuario}
                  onChange={handleChange}
                  required
                  placeholder="Ingrese email"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Contraseña {!isEditing && "*"}</Form.Label>
                <Form.Control
                  type="password"
                  name="contrasenia"
                  value={formData.contrasenia}
                  onChange={handleChange}
                  required={!isEditing}
                  placeholder={
                    isEditing
                      ? "Dejar vacío para no cambiar"
                      : "Ingrese contraseña"
                  }
                />
                {isEditing && (
                  <Form.Text className="text-muted">
                    Dejar vacío para mantener la contraseña actual
                  </Form.Text>
                )}
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Rol *</Form.Label>
                <Form.Select
                  name="rol"
                  value={formData.rol}
                  onChange={handleChange}
                  required
                >
                  <option value="usuario">Usuario</option>
                  <option value="admin">Administrador</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="Ingrese teléfono"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Plan</Form.Label>
                <Form.Select
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}
                >
                  <option value="Sin plan">Sin plan</option>
                  <option value="Musculación">Musculación</option>
                  <option value="Clases">Clases</option>
                  <option value="Full">Full</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Guardando..." : isEditing ? "Actualizar" : "Crear"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default FormUsuario;
