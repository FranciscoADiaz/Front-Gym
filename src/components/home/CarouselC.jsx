import { Carousel } from "react-bootstrap";
import img2 from "../../assets/home2.webp";
import img4 from "../../assets/home4.jpg";
import img5 from "../../assets/home5.jpg";


const CarruselInicio = () => {
  return (
    <Carousel fade controls={false} indicators={false} interval={5000}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img5}
          alt="Primera imagen"
          style={{ maxHeight: "500px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h3>Bienvenido a TucuGym</h3>
          <p>Las mejores máquinas, un lugar para entrenar cuerpo y mente</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img2}
          alt="Segunda imagen"
          style={{ maxHeight: "500px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h3>Conocé a nuestros profesores</h3>
          <p>
            Profesionales que te acompañan en cada paso. Asesoramiento
            personalizado
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img4}
          alt="Tercera imagen"
          style={{ maxHeight: "500px", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h3>Comenzá ahora</h3>
          <p>
            Mandanos un wp para definir tu plan. En TucuGym te ayudamos a
            alcanzar tus objetivos, contamos con un ambiente único, atención
            personalizada y las mejores instalaciones de Tucumán.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarruselInicio;
