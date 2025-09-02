import { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Alert } from "react-bootstrap";
import Swal from "sweetalert2";
import {
  crearUsuario,
  actualizarUsuario,
  asignarPlanUsuario,
} from "../../helpers/usuarios.helper";

const FormUsuario = ({ show, handleClose, usuario = null, onSuccess }) => {
  const [formData, setFormData] = useState({
    nombreUsuario: "",
    emailUsuario: "",
    contrasenia: "",
    rol: "usuario",
    telefono: "",
  });

  const [planData, setPlanData] = useState({
    plan: "Completo",
    duracion: 1,
    precio: 30000,
  });

  const [loading, setLoading] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [showPlanSection, setShowPlanSection] = useState(false);

  // Precios por plan y duración
  const precios = {
    Musculación: { 1: 20000, 3: 50000, 6: 90000 },
    Funcional: { 1: 25000, 3: 65000, 6: 120000 },
    Completo: { 1: 30000, 3: 80000, 6: 150000 },
  };

  // Si es edición, cargar datos del usuario
  useEffect(() => {
    if (usuario) {
      const datosUsuario = {
        nombreUsuario: usuario.nombreUsuario || "",
        emailUsuario: usuario.emailUsuario || "",
        contrasenia: "",
        rol: usuario.rol || "usuario",
        telefono: usuario.telefono || "",
      };
      setFormData(datosUsuario);
    } else {
      const datosNuevo = {
        nombreUsuario: "",
        emailUsuario: "",
        contrasenia: "",
        rol: "usuario",
        telefono: "",
      };
      setFormData(datosNuevo);
    }
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlanChange = (e) => {
    const { name, value } = e.target;
    setPlanData((prev) => {
      const newData = {
        ...prev,
        [name]: value,
      };

      // Actualizar precio automáticamente cuando cambie plan o duración
      if (name === "plan" || name === "duracion") {
        const plan = name === "plan" ? value : newData.plan;
        const duracion =
          name === "duracion" ? parseInt(value) : parseInt(newData.duracion);
        newData.precio = precios[plan]?.[duracion] || 30000;
      }

      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (usuario) {
        await actualizarUsuario(usuario._id, formData);
        Swal.fire("¡Éxito!", "Usuario actualizado correctamente", "success");
      } else {
        await crearUsuario(formData);
        Swal.fire("¡Éxito!", "Usuario creado correctamente", "success");
      }

      onSuccess();
      handleClose();
    } catch (error) {
      Swal.fire(
        "Error",
        error.message || error.response?.data?.msg || "Ocurrió un error",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAsignarPlan = async () => {
    if (!usuario) return;

    setLoadingPlan(true);
    try {
      const response = await asignarPlanUsuario(usuario._id, planData);

      Swal.fire({
        title: "¡Plan asignado exitosamente!",
        text: `Se ha asignado el plan ${planData.plan} al usuario ${usuario.nombreUsuario}`,
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      onSuccess();
      setShowPlanSection(false);
    } catch (error) {
      Swal.fire({
        title: "Error al asignar plan",
        text: error.message,
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } finally {
      setLoadingPlan(false);
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
                  placeholder={isEditing ? "********" : "Ingrese contraseña"}
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
          </Row>

          {/* Sección de Asignar Plan (solo para edición) */}
          {isEditing && (
            <div className="mt-4">
              <hr />
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0">
                  <i className="fas fa-user-plus me-2"></i>
                  Asignar Plan
                </h6>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setShowPlanSection(!showPlanSection)}
                >
                  {showPlanSection ? "Ocultar" : "Mostrar"}
                </Button>
              </div>

              {showPlanSection && (
                <>
                  <Alert variant="info" className="mb-3">
                    <strong>Usuario:</strong> {usuario.nombreUsuario} (
                    {usuario.emailUsuario})
                  </Alert>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Plan</Form.Label>
                        <Form.Select
                          name="plan"
                          value={planData.plan}
                          onChange={handlePlanChange}
                          required
                        >
                          <option value="Musculación">Musculación</option>
                          <option value="Funcional">Funcional</option>
                          <option value="Completo">Completo</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Duración (meses)</Form.Label>
                        <Form.Select
                          name="duracion"
                          value={planData.duracion}
                          onChange={handlePlanChange}
                          required
                        >
                          <option value={1}>1 mes</option>
                          <option value={3}>3 meses</option>
                          <option value={6}>6 meses</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Precio (ARS)</Form.Label>
                        <Form.Control
                          type="number"
                          name="precio"
                          value={planData.precio}
                          onChange={handlePlanChange}
                          required
                          readOnly
                          className="bg-light"
                        />
                        <Form.Text className="text-muted">
                          El precio se calcula automáticamente según el plan y
                          duración seleccionados.
                        </Form.Text>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Alert variant="warning" className="mb-3">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    <strong>Importante:</strong> Al asignar un plan, se creará
                    un registro en la base de datos y el usuario podrá acceder
                    inmediatamente a los servicios correspondientes.
                  </Alert>

                  <div className="text-end">
                    <Button
                      variant="success"
                      onClick={handleAsignarPlan}
                      disabled={loadingPlan}
                    >
                      {loadingPlan ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Asignando...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-check me-2"></i>
                          Asignar Plan
                        </>
                      )}
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
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
