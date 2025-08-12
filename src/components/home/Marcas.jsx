import { Container, Image } from "react-bootstrap";
import "./Marcas.css";
import Gatorade from "../../assets/Gatorade.svg";
import ON from "../../assets/ON.png";
import Nike from "../../assets/Nike.webp";
import PLS from "../../assets/PLS.webp";
import NF from "../../assets/NF.png";

const marcas = [
  { nombre: "ON", imagen: ON },
  { nombre: "Gatorade", imagen: Gatorade },
  { nombre: "Adidas", imagen: Nike },
  { nombre: "PowerLabs", imagen: PLS },
  { nombre: "NF", imagen: NF },
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
                  src={marca.imagen}
                  alt={marca.nombre}
                  fluid
                  className="marca-logo"
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
