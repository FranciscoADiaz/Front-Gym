import { useChangeTitle } from "../helpers/useChangeTitlePage";
import { Container } from "react-bootstrap";
import Planes from "../components/home/Planes";

const PlanesPage = () => {
  useChangeTitle("Planes");

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Nuestros Planes Mensuales</h1>
      <p className="text-center text-muted mb-5">
        Elegí el plan que mejor se adapte a tus objetivos y estilo de
        entrenamiento
      </p>
      <Planes />
    </Container>
  );
};

export default PlanesPage;
