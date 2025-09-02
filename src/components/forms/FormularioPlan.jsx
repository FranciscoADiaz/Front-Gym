import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";

const FormularioPlan = ({ plan, onGuardar, onCancelar }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    tipo: "",
    precio: 0,
    duracion: 1,
    caracteristicas: [],
    estado: "activo",
    imagen: "",
  });

  const [caracteristicaTemp, setCaracteristicaTemp] = useState("");
  const [errors, setErrors] = useState({});

  const tiposPlan = [
    { value: "Musculación", label: "💪 Musculación" },
    { value: "Funcional", label: "🏃 Funcional" },
    { value: "Completo", label: "🏋️ Completo" },
  ];

  const estados = [
    { value: "activo", label: "✅ Activo" },
    { value: "inactivo", label: "⏸️ Inactivo" },
  ];

  useEffect(() => {
    if (plan) {
      setFormData({
        nombre: plan.nombre || "",
        descripcion: plan.descripcion || "",
        tipo: plan.tipo || "",
        precio: plan.precio || 0,
        duracion: plan.duracion || 1,
        caracteristicas: plan.caracteristicas || [],
        estado: plan.estado || "activo",
        imagen: plan.imagen || "",
      });
    }
  }, [plan]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar error del campo
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleCaracteristicaChange = (e) => {
    setCaracteristicaTemp(e.target.value);
  };

  const agregarCaracteristica = () => {
    if (!caracteristicaTemp.trim()) {
      setErrors((prev) => ({
        ...prev,
        caracteristicas: "Debe ingresar una característica",
      }));
      return;
    }

    // Verificar que no exista la característica
    const existe = formData.caracteristicas.some(
      (c) => c.toLowerCase() === caracteristicaTemp.trim().toLowerCase()
    );

    if (existe) {
      setErrors((prev) => ({
        ...prev,
        caracteristicas: "Esta característica ya existe",
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      caracteristicas: [...prev.caracteristicas, caracteristicaTemp.trim()],
    }));

    setCaracteristicaTemp("");
    setErrors((prev) => ({ ...prev, caracteristicas: "" }));
  };

  const eliminarCaracteristica = (index) => {
    setFormData((prev) => ({
      ...prev,
      caracteristicas: prev.caracteristicas.filter((_, i) => i !== index),
    }));
  };

  const validarFormulario = () => {
    const nuevosErrors = {};

    if (!formData.nombre.trim()) {
      nuevosErrors.nombre = "El nombre es requerido";
    }

    if (!formData.descripcion.trim()) {
      nuevosErrors.descripcion = "La descripción es requerida";
    }

    if (!formData.tipo) {
      nuevosErrors.tipo = "Debe seleccionar un tipo de plan";
    }

    if (formData.precio < 0) {
      nuevosErrors.precio = "El precio no puede ser negativo";
    }

    if (formData.duracion < 1 || formData.duracion > 12) {
      nuevosErrors.duracion = "La duración debe estar entre 1 y 12 meses";
    }

    if (formData.caracteristicas.length === 0) {
      nuevosErrors.caracteristicas = "Debe agregar al menos una característica";
    }

    setErrors(nuevosErrors);
    return Object.keys(nuevosErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      onGuardar(formData);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">📝 Nombre del Plan</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              placeholder="Ej: Plan Musculación Premium"
              isInvalid={!!errors.nombre}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nombre}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">🏷️ Tipo de Plan</Form.Label>
            <Form.Select
              name="tipo"
              value={formData.tipo}
              onChange={handleInputChange}
              isInvalid={!!errors.tipo}
            >
              <option value="">Seleccionar tipo...</option>
              {tiposPlan.map((tipo) => (
                <option key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.tipo}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">📄 Descripción</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="descripcion"
          value={formData.descripcion}
          onChange={handleInputChange}
          placeholder="Describe el plan, beneficios, servicios incluidos..."
          isInvalid={!!errors.descripcion}
        />
        <Form.Control.Feedback type="invalid">
          {errors.descripcion}
        </Form.Control.Feedback>
      </Form.Group>

      <Row>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">💰 Precio</Form.Label>
            <Form.Control
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              isInvalid={!!errors.precio}
            />
            <Form.Control.Feedback type="invalid">
              {errors.precio}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">⏱️ Duración (meses)</Form.Label>
            <Form.Control
              type="number"
              name="duracion"
              value={formData.duracion}
              onChange={handleInputChange}
              min="1"
              max="12"
              isInvalid={!!errors.duracion}
            />
            <Form.Control.Feedback type="invalid">
              {errors.duracion}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">📊 Estado</Form.Label>
            <Form.Select
              name="estado"
              value={formData.estado}
              onChange={handleInputChange}
            >
              {estados.map((estado) => (
                <option key={estado.value} value={estado.value}>
                  {estado.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">🖼️ URL de Imagen</Form.Label>
        <Form.Control
          type="url"
          name="imagen"
          value={formData.imagen}
          onChange={handleInputChange}
          placeholder="https://ejemplo.com/imagen.jpg"
        />
      </Form.Group>

      {/* Características */}
      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">✨ Características del Plan</Form.Label>
        <div className="d-flex gap-2 mb-2">
          <Form.Control
            type="text"
            value={caracteristicaTemp}
            onChange={handleCaracteristicaChange}
            placeholder="Ej: Acceso a todas las clases"
            isInvalid={!!errors.caracteristicas}
          />
          <Button
            type="button"
            variant="outline-success"
            onClick={agregarCaracteristica}
          >
            ➕ Agregar
          </Button>
        </div>
        <Form.Control.Feedback type="invalid">
          {errors.caracteristicas}
        </Form.Control.Feedback>

        {/* Lista de características */}
        {formData.caracteristicas.length > 0 && (
          <div className="mt-3">
            <h6 className="text-muted">Características agregadas:</h6>
            <div className="d-flex flex-wrap gap-2">
              {formData.caracteristicas.map((caracteristica, index) => (
                <div
                  key={index}
                  className="badge bg-primary d-flex align-items-center gap-1"
                >
                  {caracteristica}
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    style={{ fontSize: "0.5rem" }}
                    onClick={() => eliminarCaracteristica(index)}
                  ></button>
                </div>
              ))}
            </div>
          </div>
        )}
      </Form.Group>

      {/* Botones */}
      <div className="d-flex gap-2 justify-content-end">
        <Button variant="secondary" onClick={onCancelar}>
          ❌ Cancelar
        </Button>
        <Button variant="primary" type="submit">
          {plan ? "💾 Actualizar Plan" : "✅ Crear Plan"}
        </Button>
      </div>
    </Form>
  );
};

export default FormularioPlan;
