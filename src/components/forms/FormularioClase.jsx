import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";

const FormularioClase = ({ clase, onGuardar, onCancelar }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    tipoClase: "",
    capacidad: 20,
    duracion: 60,
    precio: 0,
    estado: "activa",
    imagen: "",
    horarios: [],
  });

  const [horarioTemp, setHorarioTemp] = useState({
    dia: "lunes",
    hora: "08:00",
  });
  const [errors, setErrors] = useState({});

  const tiposClase = [
    { value: "Spinning", label: "🚴 Spinning" },
    { value: "Funcional", label: "💪 Funcional" },
    { value: "Crossfit", label: "🔥 Crossfit" },
  ];

  const dias = [
    { value: "lunes", label: "Lunes" },
    { value: "martes", label: "Martes" },
    { value: "miercoles", label: "Miércoles" },
    { value: "jueves", label: "Jueves" },
    { value: "viernes", label: "Viernes" },
    { value: "sabado", label: "Sábado" },
    { value: "domingo", label: "Domingo" },
  ];

  const estados = [
    { value: "activa", label: "✅ Activa" },
    { value: "inactiva", label: "⏸️ Inactiva" },
    { value: "suspendida", label: "⚠️ Suspendida" },
  ];

  useEffect(() => {
    if (clase) {
      setFormData({
        nombre: clase.nombre || "",
        descripcion: clase.descripcion || "",
        tipoClase: clase.tipoClase || "",
        capacidad: clase.capacidad || 20,
        duracion: clase.duracion || 60,
        precio: clase.precio || 0,
        estado: clase.estado || "activa",
        imagen: clase.imagen || "",
        horarios: clase.horarios || [],
      });
    }
  }, [clase]);

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

  const handleHorarioChange = (e) => {
    const { name, value } = e.target;
    setHorarioTemp((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const agregarHorario = () => {
    if (!horarioTemp.dia || !horarioTemp.hora) {
      setErrors((prev) => ({
        ...prev,
        horarios: "Debe seleccionar día y hora",
      }));
      return;
    }

    // Verificar que no exista el horario
    const existe = formData.horarios.some(
      (h) => h.dia === horarioTemp.dia && h.hora === horarioTemp.hora
    );

    if (existe) {
      setErrors((prev) => ({
        ...prev,
        horarios: "Este horario ya existe",
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      horarios: [...prev.horarios, { ...horarioTemp }],
    }));

    setHorarioTemp({ dia: "lunes", hora: "08:00" });
    setErrors((prev) => ({ ...prev, horarios: "" }));
  };

  const eliminarHorario = (index) => {
    setFormData((prev) => ({
      ...prev,
      horarios: prev.horarios.filter((_, i) => i !== index),
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

    if (!formData.tipoClase) {
      nuevosErrors.tipoClase = "Debe seleccionar un tipo de clase";
    }

    if (formData.capacidad < 1 || formData.capacidad > 50) {
      nuevosErrors.capacidad = "La capacidad debe estar entre 1 y 50";
    }

    if (formData.duracion < 60 || formData.duracion > 120) {
      nuevosErrors.duracion = "La duración debe estar entre 60 y 120 minutos";
    }

    if (formData.precio < 0) {
      nuevosErrors.precio = "El precio no puede ser negativo";
    }

    if (formData.horarios.length === 0) {
      nuevosErrors.horarios = "Debe agregar al menos un horario";
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
            <Form.Label className="fw-bold">📝 Nombre de la Clase</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              placeholder="Ej: Spinning Intensivo"
              isInvalid={!!errors.nombre}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nombre}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">🏷️ Tipo de Clase</Form.Label>
            <Form.Select
              name="tipoClase"
              value={formData.tipoClase}
              onChange={handleInputChange}
              isInvalid={!!errors.tipoClase}
            >
              <option value="">Seleccionar tipo...</option>
              {tiposClase.map((tipo) => (
                <option key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.tipoClase}
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
          placeholder="Describe la clase, objetivos, nivel de intensidad..."
          isInvalid={!!errors.descripcion}
        />
        <Form.Control.Feedback type="invalid">
          {errors.descripcion}
        </Form.Control.Feedback>
      </Form.Group>

      <Row>
        <Col md={6}>
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

      <Row>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">👥 Capacidad</Form.Label>
            <Form.Control
              type="number"
              name="capacidad"
              value={formData.capacidad}
              onChange={handleInputChange}
              min="1"
              max="50"
              isInvalid={!!errors.capacidad}
            />
            <Form.Control.Feedback type="invalid">
              {errors.capacidad}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">⏱️ Duración (minutos)</Form.Label>
            <Form.Control
              type="number"
              name="duracion"
              value={formData.duracion}
              onChange={handleInputChange}
              min="60"
              max="120"
              isInvalid={!!errors.duracion}
            />
            <Form.Control.Feedback type="invalid">
              {errors.duracion}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">💰 Precio</Form.Label>
            <Form.Control
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleInputChange}
              min="0"
              step="100"
              isInvalid={!!errors.precio}
            />
            <Form.Control.Feedback type="invalid">
              {errors.precio}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">🖼️ URL de Imagen (opcional)</Form.Label>
        <Form.Control
          type="url"
          name="imagen"
          value={formData.imagen}
          onChange={handleInputChange}
          placeholder="https://ejemplo.com/imagen.jpg"
        />
      </Form.Group>

      {/* Sección de Horarios */}
      <div className="border rounded p-3 mb-3">
        <h6 className="fw-bold mb-3">📅 Horarios de la Clase</h6>

        {errors.horarios && (
          <Alert variant="danger" className="mb-3">
            {errors.horarios}
          </Alert>
        )}

        <Row className="mb-3">
          <Col md={4}>
            <Form.Select
              name="dia"
              value={horarioTemp.dia}
              onChange={handleHorarioChange}
            >
              {dias.map((dia) => (
                <option key={dia.value} value={dia.value}>
                  {dia.label}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Control
              type="time"
              name="hora"
              value={horarioTemp.hora}
              onChange={handleHorarioChange}
            />
          </Col>
          <Col md={4}>
            <Button
              variant="outline-primary"
              onClick={agregarHorario}
              className="w-100"
            >
              ➕ Agregar Horario
            </Button>
          </Col>
        </Row>

        {/* Lista de horarios agregados */}
        {formData.horarios.length > 0 && (
          <div>
            <h6 className="mb-2">Horarios configurados:</h6>
            <div className="d-flex flex-wrap gap-2">
              {formData.horarios.map((horario, index) => (
                <div
                  key={index}
                  className="badge bg-primary d-flex align-items-center gap-1"
                  style={{ fontSize: "0.9rem" }}
                >
                  <span>
                    {horario.dia} {horario.hora}
                  </span>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => eliminarHorario(index)}
                    style={{ fontSize: "0.7rem" }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Botones */}
      <div className="d-flex gap-2 justify-content-end">
        <Button variant="secondary" onClick={onCancelar}>
          ❌ Cancelar
        </Button>
        <Button variant="primary" type="submit">
          {clase ? "💾 Actualizar Clase" : "✅ Crear Clase"}
        </Button>
      </div>
    </Form>
  );
};

export default FormularioClase;
