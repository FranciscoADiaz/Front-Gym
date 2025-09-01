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
      setAdmin({ nombre: payload.nombreUsuario });
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
      {/* Header con saludo */}
      <div className="bg-primary text-white p-4 rounded-3 mb-4 shadow">
        <h1 className="mb-2 fw-bold">👋 Bienvenido, {admin.nombre}</h1>
      
      </div>

      {/* Sección de clases */}
      <div className="bg-light p-4 rounded-3 shadow-sm">
        <h3 className="text-primary fw-bold mb-4">
          📅 Clases de hoy ({clasesDelDia.length})
        </h3>

        {clasesDelDia.length === 0 ? (
          <div className="text-center py-5">
            <div className="text-muted mb-3">
              <i className="fas fa-calendar-times fs-1"></i>
            </div>
            <p className="text-muted fs-5 mb-0">
              No hay clases registradas para hoy
            </p>
           
          </div>
        ) : (
          <div className="row">
            {clasesDelDia.map((clase, index) => (
              <div key={index} className="col-12">
                <ClasesHoy clase={clase} />
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default AdminHomePage;
