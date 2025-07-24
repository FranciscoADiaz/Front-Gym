
import { useChangeTitle } from '../helpers/useChangeTitlePage'


import home from '../assets/home.webp'
import { Container } from 'react-bootstrap'
import Wp from '../components/wp/BotonWhatsapp'
import ejercicio from '../assets/ejercicio.jpeg'

const HomePage = () => {
  useChangeTitle("Inicio");
  return (
    <>
      <Container idPage="inicio">
        <img src={home} alt="" className="app-contenido-dos" />
  <img src={ejercicio} alt="" className='app-contenido-dos' />
        <Wp />
      </Container>
    </>
  );
};

export default HomePage;
