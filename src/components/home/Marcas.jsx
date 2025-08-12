import { Container, Image } from "react-bootstrap";
import "./Marcas.css";

const marcas = [
  {
    nombre: "ON",

    url: "https://res.cloudinary.com/dpy5kwico/image/upload/v1754950159/ON_pknovs.png",
  },
  {
    nombre: "Gatorade",
    url: "https://res.cloudinary.com/dpy5kwico/image/upload/v1754950146/Gatorade_hhz3xj.svg",
  },
  {
    nombre: "Nike",
    url: "https://res.cloudinary.com/dpy5kwico/image/upload/v1754950156/Nike_uvwc73.webp",
  },
  {
    nombre: "PowerLabs",
    url: "https://res.cloudinary.com/dpy5kwico/image/upload/v1754950156/PLS_cblurh.webp",
  },
  {
    nombre: "NF",
    url: "https://res.cloudinary.com/dpy5kwico/image/upload/v1754950155/NF_yccoei.png",
  },
];

const MarcasC = () => {
  return (
    <section className="py-5 bg-dark">
      <Container>
        <h2 className="text-center mb-4">MARCAS ASOCIADAS</h2>

        <div className="marcas-wrapper">
          <div className="marcas-slider">
            {marcas.map((marca, i) => (
              <div key={i} className="marca-item">
                <Image
                  src={marca.url} // ✅ URL desde Cloudinary
                  alt={marca.nombre}
                  fluid
                  loading="lazy"
                  className="marca-logo"
                  style={{
                    // Para logos: no recortar; que se adapte sin deformar
                    objectFit: "contain",
                    aspectRatio: "2/1", // opcional: da caja estable al slider
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default MarcasC;
