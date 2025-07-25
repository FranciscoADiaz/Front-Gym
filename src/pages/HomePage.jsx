import { useChangeTitle } from '../helpers/useChangeTitlePage';
import { Container } from 'react-bootstrap';
import Wp from '../components/wp/BotonWhatsapp';
import InfoGimnasio from '../components/home/InfoGimnasio';
import Servicios from '../components/home/Servicios';
import Productos from '../components/home/Productos';
import Marcas from '../components/home/Marcas';
import Comentarios from '../components/home/Comentarios';
import Profesores from '../components/home/Profesores';
import Planes from '../components/home/Planes';

const HomePage = () => {
  useChangeTitle("Inicio");

  return (
    <>
      <Container idPage="inicio">
       
        <Wp />
        <InfoGimnasio />
        <Planes />
        <Productos />
        <Marcas />
        <Comentarios />
        <Profesores />
        
      </Container>
    </>
  );
};

export default HomePage;
