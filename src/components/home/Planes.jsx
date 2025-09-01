import { useNavigate } from "react-router";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import FormularioContratacion from "../forms/FormularioContratacion";
import "./Componentes.css";

const Planes = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [planSeleccionado, setPlanSeleccionado] = useState(null);

  const planes = [
    {
      nombre: "SOLO MUSCULACIÓN",
      ruta: "musculacion",
      url: "https://res.cloudinary.com/dpy5kwico/image/upload/v1755020300/musculaci%C3%B3n1_jnsmsa.jpg",
      alt: "Área de musculación con máquinas",
      descripcion:
        "Acceso ilimitado al área de pesas y máquinas. Ideal para quienes entrenan por cuenta propia.",
    },
    {
      nombre: "SOLO CLASES",
      ruta: "clases",
      url: "https://res.cloudinary.com/dpy5kwico/image/upload/v1755020301/clases2_v1u6as.jpg",
      alt: "Clases grupales de funcional y spinning",
      descripcion:
        "Incluye todas las clases grupales: funcional, spinning, zumba. Ideal para quienes buscan variedad y motivación.",
    },
    {
      nombre: "PLAN FULL",
      ruta: "full",
      url: "https://res.cloudinary.com/dpy5kwico/image/upload/v1755020303/full3_u19eol.webp",
      alt: "Entrenamiento integral con musculación y clases",
      descripcion:
        "Incluye musculación y clases. La opción más completa para transformar tu cuerpo. Elegí la que más te guste.",
    },
  ];

  const handleShowModal = (plan) => {
    setPlanSeleccionado(plan);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPlanSeleccionado(null);
  };

  const handleSuccess = () => {
    // Aquí podrías actualizar algo si es necesario
    console.log("Plan contratado exitosamente");
  };

  return (
    <section className="bg-dark text-white padding-vertical ">
      <div className="container-fluid">
        <h2 className="text-center mb-4">NUESTROS PLANES MENSUALES</h2>

        <Row className="g-4 justify-content-center">
          {planes.map((plan, i) => (
            <Col key={i} xs={10} sm={6} md={4}>
              <Card className="h-100 card-hover borde-card">
                <Card.Body className="p-0">
                  <img
                    src={plan.url}
                    alt={plan.alt}
                    loading="lazy"
                    className="img-fluid w-100"
                    style={{
                      aspectRatio: "16/9",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />

                  <Card.Title className="text-center text-dark mb-2">
                    {plan.nombre}
                  </Card.Title>

                  <div className="descripcion-card py-2 my-0 text-center">
                    <Card.Text className="mx-2">{plan.descripcion}</Card.Text>
                  </div>

                  {/* Botón de inscripción */}
                  <div className="p-3 text-center">
                    <Button
                      variant="success"
                      size="lg"
                      className="w-100 fw-bold"
                      onClick={() => handleShowModal(plan)}
                    >
                      INSCRIBIRSE
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Modal de contratación */}
      {planSeleccionado && (
        <FormularioContratacion
          show={showModal}
          handleClose={handleCloseModal}
          plan={planSeleccionado}
          onSuccess={handleSuccess}
        />
      )}
    </section>
  );
};

export default Planes;
