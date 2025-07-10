
import { useChangeTitle } from '../helpers/useChangeTitlePage'

import home from '../assets/Home.png'
import ejercicio from '../assets/ejercicio.jpeg'
import { Container } from 'react-bootstrap'

const HomePage = () => {
  useChangeTitle("Inicio");
  return (
    <>
      <Container idPage="inicio">
        <img src={home} alt="" className="app-contenido" />
        <img src={ejercicio} alt="" className="app-contenido-dos" />
      </Container>
    </>
  );
};

export default HomePage;
