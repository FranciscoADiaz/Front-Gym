
import { useChangeTitle } from '../helpers/useChangeTitlePage'

import home from '../assets/Home.png'
import { Container } from 'react-bootstrap'

const HomePage = () => {
  useChangeTitle("Inicio");
  return (
    <>
      <Container idPage="inicio">
        <img src={home} alt="" className="app-contenido" />
      </Container>
    </>
  );
};

export default HomePage;
