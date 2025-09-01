import FormularioReserva from "../components/forms/FormularioReserva";
import ListaReservas from "../components/forms/ListaReservas";
import { useChangeTitle } from "../helpers/useChangeTitlePage";

const ReservaPage = () => {
  useChangeTitle("reservar");
  return (
    <div className="contenedor-pagina">
      <div className="container">
        <h1 className="text-center mb-5">Reserva de Clases TucuGym</h1>
        <FormularioReserva />
        <ListaReservas />
      </div>
    </div>
  );
};

export default ReservaPage;
