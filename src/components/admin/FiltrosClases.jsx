import React, { useState } from "react";
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";

const FiltrosClases = ({ onFiltrar, onLimpiar }) => {
  const [filtros, setFiltros] = useState({
    busqueda: "",
    tipoClase: "",
    profesor: "",
    estado: "",
    capacidadMin: "",
    capacidadMax: "",
    precioMin: "",
    precioMax: "",
  });

  const tiposClase = [
    { value: "", label: "Todos los tipos" },
    { value: "Spinning", label: "🚴 Spinning" },
    { value: "Funcional", label: "💪 Funcional" },
    { value: "Crossfit", label: "🔥 Crossfit" },
    { value: "Yoga", label: "🧘 Yoga" },
    { value: "Pilates", label: "🤸 Pilates" },
    { value: "Zumba", label: "💃 Zumba" },
  ];

  const profesores = [
    { value: "", label: "Todos los profesores" },
    { value: "andres", label: "Andrés" },
    { value: "walter", label: "Walter" },
    { value: "daniela", label: "Daniela" },
    { value: "maria", label: "María" },
    { value: "carlos", label: "Carlos" },
  ];

  const estados = [
    { value: "", label: "Todos los estados" },
    { value: "activa", label: "✅ Activa" },
    { value: "inactiva", label: "⏸️ Inactiva" },
    { value: "suspendida", label: "⚠️ Suspendida" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFiltrar = () => {
    onFiltrar(filtros);
  };

  const handleLimpiar = () => {
    const filtrosLimpios = {
      busqueda: "",
      tipoClase: "",
      profesor: "",
      estado: "",
      capacidadMin: "",
      capacidadMax: "",
      precioMin: "",
      precioMax: "",
    };
    setFiltros(filtrosLimpios);
    onLimpiar();
  };

  return (
    <div className="bg-light p-4 rounded-3 shadow-sm mb-4">
      <h5 className="fw-bold mb-3">🔍 Filtros y Búsqueda</h5>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>🔎 Buscar por nombre</Form.Label>
            <Form.Control
              type="text"
              name="busqueda"
              value={filtros.busqueda}
              onChange={handleInputChange}
              placeholder="Buscar clases..."
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>🏷️ Tipo de Clase</Form.Label>
            <Form.Select
              name="tipoClase"
              value={filtros.tipoClase}
              onChange={handleInputChange}
            >
              {tiposClase.map((tipo) => (
                <option key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>👨‍🏫 Profesor</Form.Label>
            <Form.Select
              name="profesor"
              value={filtros.profesor}
              onChange={handleInputChange}
            >
              {profesores.map((prof) => (
                <option key={prof.value} value={prof.value}>
                  {prof.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>📊 Estado</Form.Label>
            <Form.Select
              name="estado"
              value={filtros.estado}
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
        <Col md={6}>
          <Form.Label>👥 Capacidad</Form.Label>
          <Row>
            <Col>
              <Form.Control
                type="number"
                name="capacidadMin"
                value={filtros.capacidadMin}
                onChange={handleInputChange}
                placeholder="Mín"
                min="1"
              />
            </Col>
            <Col>
              <Form.Control
                type="number"
                name="capacidadMax"
                value={filtros.capacidadMax}
                onChange={handleInputChange}
                placeholder="Máx"
                min="1"
              />
            </Col>
          </Row>
        </Col>

        <Col md={6}>
          <Form.Label>💰 Precio</Form.Label>
          <Row>
            <Col>
              <Form.Control
                type="number"
                name="precioMin"
                value={filtros.precioMin}
                onChange={handleInputChange}
                placeholder="Mín"
                min="0"
              />
            </Col>
            <Col>
              <Form.Control
                type="number"
                name="precioMax"
                value={filtros.precioMax}
                onChange={handleInputChange}
                placeholder="Máx"
                min="0"
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <div className="d-flex gap-2 justify-content-end mt-3">
        <Button variant="outline-secondary" onClick={handleLimpiar}>
          🗑️ Limpiar Filtros
        </Button>
        <Button variant="primary" onClick={handleFiltrar}>
          🔍 Aplicar Filtros
        </Button>
      </div>
    </div>
  );
};

export default FiltrosClases;
