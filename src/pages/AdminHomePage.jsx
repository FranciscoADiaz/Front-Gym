
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import clientAxios, { configHeaders } from "../helpers/axios.config.helper";
import ClasesHoy from "../components/admin/ClasesHoy";
import { useChangeTitle } from "../helpers/useChangeTitlePage";

const AdminHomePage = () => {
  const [clasesDelDia, setClasesDelDia] = useState([]);
  useChangeTitle("Panel Admin");

  useEffect(() => {
  const obtenerClasesHoy = async () => {
    try {
      const res = await clientAxios.get("/admin", configHeaders);
      console.log("Respuesta completa:", res);
      console.log("Datos recibidos:", res.data);
      setClasesDelDia(res.data.clases ?? res.data); // por si viene en res.data.clases
    } catch (error) {
      console.error("Error al obtener clases:", error);
    }
  };

  obtenerClasesHoy();
}, []);
  
  return (
    <Container className="my-4">
      <h1 className="mb-3">🔑 Bienvenido, Administrador</h1>
      <p className="text-muted">Versión del sistema: 1.0</p>

      <h3 className="mt-4">📅 Clases de hoy</h3>

      {clasesDelDia.length === 0 ? (
        <p>No hay clases registradas para hoy.</p>
      ) : (
        clasesDelDia.map((clase, index) => (
          <ClasesHoy key={index} clase={clase} />
        ))
      )}
    </Container>
  );
};

export default AdminHomePage;
