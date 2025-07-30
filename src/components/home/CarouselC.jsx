import { Carousel } from "react-bootstrap";
import img2 from "../../assets/home2.webp";
import img4 from "../../assets/home4.jpg";
import img5 from "../../assets/home5.jpg";

const CarouselC = () => {
  return (
    <Carousel fade controls={false} indicators={false} interval={5000}>
      {/* Slide 1 */}
      <Carousel.Item>
        <div>
          <img
            className="d-block w-100"
            src={img5}
            alt="Primera imagen"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
          <div className="bg-info text-dark p-4 text-center">
            <h3>Bienvenido a TucuGym</h3>
            <p>Las mejores máquinas, un lugar para entrenar cuerpo y mente</p>
          </div>
        </div>
      </Carousel.Item>

      {/* Slide 2 */}
      <Carousel.Item>
        <div>
          <img
            className="d-block w-100"
            src={img2}
            alt="Segunda imagen"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
          <div className="bg-light text-dark p-4 text-center">
            <h3>Conocé a nuestros profesores</h3>
            <p>Profesionales que te acompañan en cada paso. Asesoramiento personalizado.</p>
          </div>
        </div>
      </Carousel.Item>

      {/* Slide 3 */}
      <Carousel.Item>
        <div>
          <img
            className="d-block w-100"
            src={img4}
            alt="Tercera imagen"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
          <div className="bg-light text-dark p-4 text-center">
            <h3>Comenzá ahora</h3>
            <p>
              Mandanos un WhatsApp para definir tu plan. En TucuGym te ayudamos a alcanzar tus
              objetivos, con un ambiente único y atención personalizada.
            </p>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselC;
