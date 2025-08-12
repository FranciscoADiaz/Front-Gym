import { Container, Carousel } from "react-bootstrap";
import "./Componentes.css";


const comentarios = [
  {
    url: "https://res.cloudinary.com/dpy5kwico/image/upload/v1754950146/comentario3_yrxkdf.webp",
    texto:
      "Tucumán Gym me motivó a entrenar todos los días. Excelente atención y ambiente.",
    autor: "Romina Salazar - Plan Full",
  },
  {
    url: "https://res.cloudinary.com/dpy5kwico/image/upload/v1754950146/comentario2_mmgk5u.webp",
    texto:
      "Las clases son dinámicas y divertidas. Los profes te acompañan en todo.",
    autor: "Carlos Ríos - Solo Clases",
  },
  {
    url: "https://res.cloudinary.com/dpy5kwico/image/upload/v1754950146/comentario1_jxiofm.jpg",
    texto:
      "El área de musculación está muy bien equipada. Me siento cómoda entrenando acá.",
    autor: "Eliana Gómez - Musculación",
  },
];

const Comentarios = () => {
  return (
    <section className="padding-vertical bg-secondary text-white">
      <Container className="text-center">
        <h2 className="mb-4">COMENTARIOS</h2>

      
        <Carousel controls={false} indicators={false} interval={5000}>
          {comentarios.map((c, i) => (
            <Carousel.Item key={i}>
        
              <img
                src={c.url}
                alt={`Foto de ${c.autor}`}
                loading="lazy"
                className="rounded-circle mb-3 img-circular-sm" 
                style={{
                  width: 120,
                  height: 120,
                  objectFit: "cover",
                  display: "block",
                  margin: "0 auto",
                }}
              />

              
              <p className="fst-italic">"{c.texto}"</p>
              <p className="fw-bold">{c.autor}</p>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  );
};

export default Comentarios;
