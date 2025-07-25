
import FormularioReserva from "../components/forms/FormularioReserva";
import ListaReservas from "../components/forms/ListaReservas";
import { useChangeTitle } from '../helpers/useChangeTitlePage'


const ReservaPage = () => {
   useChangeTitle('reservar')
  return (
    <div className="text-center my-4 text-secondary fw-bold">
      <h1>Reserva de clases TucuGym</h1>
      <FormularioReserva idPage='registrarse' />
      <hr />
      <ListaReservas />
    </div>
  );
};

export default ReservaPage;
