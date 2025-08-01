import { Container, Row, Col } from "react-bootstrap";
import Contacto from "../components/forms/Contacto";

const ContactoPage = () => {
  return (
    <section className="py-5 bg-dark text-white">
      <Container>
       
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Contacto />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactoPage;
