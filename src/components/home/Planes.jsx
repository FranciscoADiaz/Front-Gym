import { useNavigate } from "react-router";
import { Card, Row, Col } from "react-bootstrap";
import AnimacionLottieFile from "../lottie/AnimacionLottieFile";
import './Componentes.css';
const Planes = () => {
  const navigate = useNavigate();

  const planes = [
    {
      nombre: "SOLO MUSCULACIÓN",
      ruta: "musculacion",
      animacion:
        "https://lottie.host/6ac3b4a3-7afb-42a0-90b0-2ab22a711515/5P93d1YrNA.lottie",
      descripcion:
        "Acceso ilimitado al área de pesas y máquinas. Ideal para quienes entrenan por cuenta propia.",
    },
    {
      nombre: "SOLO CLASES",
      ruta: "clases",
      animacion:
        "https://lottie.host/3cb79ec8-0bd7-4d87-bd83-2dfa3499542b/T3mDyjNYlw.lottie",
      descripcion:
        "Incluye todas las clases grupales: funcional, spinning, zumba. Eligí la que más te guste.",
    },
    {
      nombre: "PLAN FULL",
      ruta: "full",
      animacion:
        "https://lottie.host/6295e538-eac4-45e8-824f-162b16a9bfdc/dpVR6cyxno.lottie",
      descripcion:
        "Incluye musculación y clases. La opción más completa para transformar tu cuerpo.",
    },
  ];

  return (
    <section className="bg-secondary text-white padding-vertical">
      <div className="container">
        <h2 className="text-center mb-4">NUESTROS PLANES MENSUALES</h2>
        <Row className="g-4 justify-content-center">
          {planes.map((plan, i) => (
            <Col key={i} xs={12} sm={6} md={4}>
              <Card
                onClick={() => navigate(`/planes/${plan.ruta}`)}
                className="h-100 shadow-sm border-0 card-hover cursor-pointer"
            
              >
                <Card.Body className="p-0" >
  <div className="text-center">
    <AnimacionLottieFile url={plan.animacion} />
    
  </div><Card.Title className="text-center text-dark mb-2">
      {plan.nombre}
    </Card.Title>
                  

    
    <div className="bg-light text-dark py-2 my-0 text-center">
  <Card.Text className="mx-2 descripcion-card">{plan.descripcion}</Card.Text>
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
