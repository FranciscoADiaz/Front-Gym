
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import clientAxios, { configHeaders } from "../helpers/axios.config.helper";
import ClasesHoy from "../components/admin/ClasesHoy";
import { useChangeTitle } from "../helpers/useChangeTitlePage";

const AdminHomePage = () => {
  
  useChangeTitle("admin");

  const [clasesDelDia, setClasesDelDia] = useState([]);

  const [admin, setAdmin] = useState({ nombre: "" });
  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    if (token) {
      const payloadBase64 = token.split(".")[1];
      const payload = JSON.parse(atob(payloadBase64));
      setAdmin({ nombre: payload.nombreUsuario});
    }
  }, []);
  
  useEffect(() => {
  const obtenerClasesHoy = async () => {
    try {
      const res = await clientAxios.get("/admin", configHeaders);
      console.log("Datos recibidos en React:", res.data);
      setClasesDelDia(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error al obtener clases:", error);
    }
  };

  obtenerClasesHoy();
}, []);
  
  return (
    <Container idPage="admin" className="my-4">
      <h1 className="mb-3">👋 Bienvenido, {admin.nombre}</h1>

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
