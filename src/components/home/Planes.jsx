import { useNavigate } from "react-router";
import { Card, Row, Col } from "react-bootstrap";
import AnimacionLottieFile from "../lottie/AnimacionLottieFile";

const Planes = () => {
  const navigate = useNavigate();

  const planes = [
    {
      nombre: "Solo musculación",
      ruta: "musculacion",
      animacion:
        "https://lottie.host/2f98893d-77c6-452b-aa6c-37f94eee9394/LerCTmhGod.lottie",
      descripcion:
        "Acceso ilimitado al área de pesas y máquinas. Ideal para quienes entrenan por cuenta propia.",
    },
    {
      nombre: "Solo clases",
      ruta: "clases",
      animacion:
        "https://lottie.host/797f8162-2d32-46ad-84dd-86793b2edd32/UsnxvBfH6Y.lottie",

      descripcion:
        "Incluye todas las clases grupales: funcional, spinning, zumba. Elige la que más te gusta.",
    },
    {
      nombre: "Plan Full",
      ruta: "full",
      animacion:
        "https://lottie.host/6295e538-eac4-45e8-824f-162b16a9bfdc/dpVR6cyxno.lottie",
      descripcion:
        "Incluye musculación y clases. La opción más completa para transformar tu cuerpo.",
    },
  ];

  return (
    <section className="py-5 my-5 bg-secondary text-white">
      <div className="container">
        <h2 className="text-center mb-4">NUESTROS PLANES MENSUALES</h2>
        <Row className="g-4 justify-content-center">
          {planes.map((plan, i) => (
            <Col key={i} xs={12} sm={6} md={4}>
              <Card
                onClick={() => navigate(`/planes/${plan.ruta}`)}
                className="h-100 shadow-sm border-0 card-hover"
                style={{ cursor: "pointer" }}
              >
                <Card.Body className="p-0" >
  <div className="text-center">
    <AnimacionLottieFile url={plan.animacion} />
    
  </div><Card.Title className="text-center text-dark mb-2">
      {plan.nombre}
    </Card.Title>
                  

    
    <div className="bg-light text-dark py-2 my-0 text-center">
  <Card.Text className="mx-0 my-0">{plan.descripcion}</Card.Text>
</div>
  
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
