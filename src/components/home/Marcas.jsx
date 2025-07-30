import { Container, Image } from "react-bootstrap";
import "./Marcas.css";
import marca1 from "../../assets/marca1.svg";
import marca2 from "../../assets/marca2.jpg";
import marca3 from "../../assets/marca3.png";
import marca4 from "../../assets/marca4.png";
import marca6 from "../../assets/marca6.png";

const marcas = [
  { nombre: "WheyPro", imagen: marca1 },
  { nombre: "NutriFit", imagen: marca3 },
  { nombre: "StrongWear", imagen: marca4 },
  { nombre: "PowerLabs", imagen: marca6 },
  { nombre: "Gatorade", imagen: marca2 },
];

const MarcasC = () => {
  return (
    <section className="py-5 bg-white">
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
