import { useParams, useNavigate } from "react-router";
import { Container, Card, Row, Col, Button } from "react-bootstrap";

const PLANES = {
  musculacion: {
    nombre: "SOLO MUSCULACIÓN",
    descripcion:
      "Acceso ilimitado al área de pesas y máquinas. Ideal para quienes entrenan por cuenta propia.",
    imagen:
      "https://res.cloudinary.com/dpy5kwico/image/upload/v1755020300/musculaci%C3%B3n1_jnsmsa.jpg",
    beneficios: [
      "Área de pesas y máquinas todo el día",
      "Asesoramiento inicial de técnica",
      "Seguimiento básico mensual",
    ],
    precio: "ARS 20.000 / mes",
    color: "primary",
  },
  clases: {
    nombre: "SOLO CLASES",
    descripcion:
      "Todas las clases grupales: funcional, spinning, zumba. Ideal para quienes buscan variedad y motivación.",
    imagen:
      "https://res.cloudinary.com/dpy5kwico/image/upload/v1755020301/clases2_v1u6as.jpg",
    beneficios: [
      "Acceso a todas las clases del calendario",
      "Profesores certificados",
      "Ambiente grupal motivador",
    ],
    precio: "ARS 25.000 / mes",
    color: "secondary",
  },
  full: {
    nombre: "PLAN FULL",
    descripcion:
      "Incluye musculación + todas las clases. La opción más completa para transformar tu cuerpo.",
    imagen:
      "https://res.cloudinary.com/dpy5kwico/image/upload/v1755020303/full3_u19eol.webp",
    beneficios: [
      "Musculación + Clases sin límites",
      "Evaluación inicial y plan de entrenamiento",
      "Descuentos en productos del gym",
    ],
    precio: "ARS 30.000 / mes",
    color: "accent",
  },
};

const DetallesPlan = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const plan = PLANES[slug];

  if (!plan) {
    return (
      <Container className="py-2 text-center">
        <h2>Plan no encontrado</h2>
        <Button variant="primary" className="mt-3" onClick={() => navigate(-1)}>
          Volver
        </Button>
      </Container>
    );
  }

  const handleInscripcion = () => {
    // Navegar a la página de inscripción
    navigate(`/inscripcion/${slug}`);
  };

  return (
    <section className="bg-dark text-white">
      <Container>
        <Row className="justify-content-center">
          <Col xs={10} md={8} lg={6}>
            <Card className="borde-card shadow overflow-hidden">
              <Card.Img
                src={plan.imagen}
                alt={plan.nombre}
                style={{ maxHeight: 270, objectFit: "cover" }}
                loading="lazy"
              />

              <Card.Body className="text-dark">
                {/* 🏷️ Título */}
                <Card.Title className="text-center mb-3">
                  {plan.nombre}
                </Card.Title>

                <p className="text-center mb-3">{plan.descripcion}</p>

                <ul className="mb-3">
                  {plan.beneficios.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>

                {plan.precio && (
                  <p className="text-center fw-bold mb-4">{plan.precio}</p>
                )}

                <div className="d-flex gap-2 justify-content-center">
                  <Button variant="primary" onClick={handleInscripcion}>
                    Inscribirme
                  </Button>
                  <Button variant="secondary" onClick={() => navigate(-1)}>
                    Volver
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default DetallesPlan;
