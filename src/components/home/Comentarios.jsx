
import { Container, Carousel } from "react-bootstrap";
import com1 from "../../assets/comentario1.jpg";
import com2 from "../../assets/comentario2.webp";
import com3 from "../../assets/comentario3.webp";

const comentarios = [
  {
    imagen: com1,
    texto:
      "TucuGym me motivó a entrenar todos los días. Excelente atención y ambiente.",
    autor: "Romina Salazar - Plan Full",
  },
  {
    imagen: com2,
    texto:
      "Las clases son dinámicas y divertidas. Los profes te acompañan en todo.",
    autor: "Carlos Ríos - Solo Clases",
  },
  {
    imagen: com3,
    texto:
      "El área de musculación está muy bien equipada. Me siento cómoda entrenando acá.",
    autor: "Eliana Gómez - Musculación",
  },
];

const Comentarios = () => {
  return (
    <section className="py-5 my-5 bg-secondary text-white">
      <Container className="text-center">
        <h2 className="mb-4">Comentarios</h2>
        <Carousel controls={false} indicators={false} interval={9000}>
          {comentarios.map((c, i) => (
            <Carousel.Item key={i}>
              <img
                src={c.imagen}
                alt={`Foto de ${c.autor}`}
                className="rounded-circle mb-3"
                style={{ width: "80px", height: "80px", objectFit: "cover" }}
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
