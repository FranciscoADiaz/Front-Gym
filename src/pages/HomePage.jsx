
import { useChangeTitle } from '../helpers/useChangeTitlePage'

import home from '../assets/Home.png'
import ejercicio from '../assets/ejercicio.jpeg'
import { Container } from 'react-bootstrap'
import Wp from '../components/wp/BotonWhatsapp'


const HomePage = () => {
  useChangeTitle("Inicio");
  return (
    <>
      <Container idPage="inicio">
        <img src={home} alt="" className="app-contenido" />
        <img src={ejercicio} alt="" className="app-contenido-dos" />
        <Wp />
      </Container>
    </>
  );
};

export default HomePage;
