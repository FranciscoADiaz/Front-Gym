import FormularioReserva from "../components/forms/FormularioReserva";
import ListaReservas from "../components/forms/ListaReservas";
import { useChangeTitle } from "../helpers/useChangeTitlePage";
import "./ReservaPage.css";

const ReservaPage = () => {
  useChangeTitle("Mis Clases");
  return (
    <div className="mis-clases-container">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Mis Clases</h1>
          <p className="page-subtitle">Reserva y gestiona tus clases</p>
        </div>
        <FormularioReserva />
        <ListaReservas />
      </div>
    </div>
  );
};

export default ReservaPage;
