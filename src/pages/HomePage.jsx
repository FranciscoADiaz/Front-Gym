
import { useChangeTitle } from '../helpers/useChangeTitlePage'
import nada from '../assets/nada.mp4'
import { Container } from 'react-bootstrap'

const HomePage = () => {
  useChangeTitle("Inicio");
  return (
    <>
      <Container idPage="inicio">
        <video src={nada}></video>
      </Container>
    </>
  );
};

export default HomePage;
