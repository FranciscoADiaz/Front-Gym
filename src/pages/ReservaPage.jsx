
import FormularioReserva from "../components/forms/FormularioReserva";
import ListaReservas from "../components/forms/ListaReservas";

const ReservaPage = () => {
  return (
    <div className="text-center my-4 text-secondary fw-bold">
      <h1>Reserva de clases TucuGym</h1>
      <FormularioReserva />
      <hr />
      <ListaReservas />
    </div>
  );
};

export default ReservaPage;
