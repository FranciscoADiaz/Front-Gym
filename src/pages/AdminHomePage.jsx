import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import clientAxios, { configHeaders } from "../helpers/axios.config.helper";
import TodasLasReservasAdmin from "../components/admin/TodasLasReservasAdmin";
import { useChangeTitle } from "../helpers/useChangeTitlePage";

const AdminHomePage = () => {
  useChangeTitle("admin");

  const [todasLasReservas, setTodasLasReservas] = useState([]);
  const [loading, setLoading] = useState(true);

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
    const obtenerDatos = async () => {
      try {
        setLoading(true);

        // Obtener todas las reservas
        const resTodas = await clientAxios.get(
          "/admin/todas-las-reservas",
          configHeaders
        );
        setTodasLasReservas(Array.isArray(resTodas.data) ? resTodas.data : []);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerDatos();
  }, []);

  return (
    <Container idPage="admin" className="my-4">
      {/* Header con saludo */}
      <div className="bg-primary text-white p-4 rounded-3 mb-4 shadow">
        <h1 className="mb-2 fw-bold">👋 Bienvenido, {admin.nombre}</h1>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3 text-muted">Cargando datos...</p>
        </div>
      ) : (
        <>
          {/* Sección de todas las reservas */}
          <div className="bg-light p-4 rounded-3 shadow-sm">
            <h3 className="text-info fw-bold mb-4">
              📊 Todas las reservas activas ({todasLasReservas.length})
            </h3>

            {todasLasReservas.length === 0 ? (
              <div className="text-center py-5">
                <div className="text-muted mb-3">
                  <i className="fas fa-database fs-1"></i>
                </div>
                <p className="text-muted fs-5 mb-0">
                  No hay reservas activas en el sistema
                </p>
              </div>
            ) : (
              <div className="row">
                {todasLasReservas.map((reserva, index) => (
                  <div key={index} className="col-12">
                    <TodasLasReservasAdmin reserva={reserva} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </Container>
  );
};

export default AdminHomePage;
