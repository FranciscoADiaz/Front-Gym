import { useChangeTitle } from "../helpers/useChangeTitlePage";
import { Container } from "react-bootstrap";
import Wp from "../components/wp/BotonWhatsapp";

import Servicios from "../components/home/Servicios";
import Productos from "../components/home/Productos";
import Marcas from "../components/home/Marcas";
import Comentarios from "../components/home/Comentarios";
import Profesores from "../components/home/Profesores";
import Planes from "../components/home/Planes";
import CarruselInicio from "../components/home/CarouselC";

const HomePage = () => {
  useChangeTitle("Inicio");

  return (
    <>
      <Container idPage="inicio">
        <Wp />
        <CarruselInicio />
        <Planes />
        <Productos />
        <Comentarios />
        <Profesores />
        <Marcas />
      </Container>
    </>
  );
};

export default HomePage;
