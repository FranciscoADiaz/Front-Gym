import { Carousel } from "react-bootstrap";


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
          <div>
          
            <img
              className="d-block w-100"
              src={slide.url}
              alt={slide.alt}
              style={{ maxHeight: "500px", objectFit: "cover" }}
              loading="lazy"
            />
          
            <div className="bg-dark text-white p-4 text-center">
              <h3>{slide.titulo}</h3>
              <p>{slide.texto}</p>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselC;
