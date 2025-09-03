import { Carousel } from "react-bootstrap";
import "./Componentes.css";

const slides = [
  {
    url: "https://res.cloudinary.com/dpy5kwico/image/upload/v1754950148/home5_qhemfg.jpg",
    alt: "Primera imagen",
    titulo: "Bienvenido a Tucumán Gym",
    texto: "Las mejores máquinas, un lugar para entrenar cuerpo y mente",
  },
  {
    url: "https://res.cloudinary.com/dpy5kwico/image/upload/v1754950147/home2_yy2ejn.webp",
    alt: "Segunda imagen",
    titulo: "Conocé a nuestros profesores",
    texto:
      "Profesionales que te acompañan en cada paso. Asesoramiento personalizado.",
  },
  {
    url: "https://res.cloudinary.com/dpy5kwico/image/upload/v1754950147/home4_e5fokn.jpg",
    alt: "Tercera imagen",
    titulo: "Comenzá ahora",
    texto:
      "Mandanos un WhatsApp para definir tu plan. En TucuGym te ayudamos a alcanzar tus objetivos, con un ambiente único y atención personalizada.",
  },
];

const CarouselC = () => {
  return (
    <Carousel fade controls={false} indicators={false} interval={5000}>
      {slides.map((slide, i) => (
        <Carousel.Item key={i}>
          <div className="hero-slide">
            <img
              className="d-block w-100 hero-img"
              src={slide.url}
              alt={slide.alt}
              loading="lazy"
            />
            <div className="hero-overlay text-center">
              <h3 className="hero-title mb-2">{slide.titulo}</h3>
              <p className="hero-text mb-0">{slide.texto}</p>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselC;
