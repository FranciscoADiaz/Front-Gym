import { useNavigate } from "react-router";
import { Card, Button, Row, Col } from "react-bootstrap";


const Planes = () => {
  const navigate = useNavigate();

  const planes = [
    {
      nombre: "Solo musculación",
      ruta: "musculacion",
      icono: "🏋️‍♂️",
      descripcion:
        "Acceso ilimitado al área de pesas y máquinas. Ideal para quienes entrenan por cuenta propia.",
    },
    {
      nombre: "Solo clases",
      ruta: "clases",
      icono: "🧘‍♀️",
      descripcion:
        "Incluye todas las clases grupales: funcional, spinning, zumba, entre otras.",
    },
    {
      nombre: "Plan Full",
      ruta: "full",
      icono: "🔥",
      descripcion:
        "Incluye musculación y clases. La opción más completa para transformar tu cuerpo.",
    },
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4">Nuestros planes mensuales</h2>
        <Row className="g-4 justify-content-center">
          {planes.map((plan, i) => (
            <Col key={i} xs={12} sm={6} md={4}>
              <Card
                onClick={() => navigate(`/planes/${plan.ruta}`)}
                className="h-100 shadow-sm border-0 card-hover"
                style={{ cursor: "pointer" }}
              >
                <Card.Body>
                  <div className="text-center fs-1">{plan.icono}</div>
                  <Card.Title className="text-center mt-3">
                    {plan.nombre}
                  </Card.Title>
                  <Card.Text className="text-muted text-center">
                    {plan.descripcion}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default Planes;
