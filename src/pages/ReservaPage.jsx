import { useChangeTitle } from "../helpers/useChangeTitlePage";
import Planes from "../components/home/Planes";
import "./ReservaPage.css";

const ReservaPage = () => {
  useChangeTitle("Reservar turno");

  return (
    <div className="mis-clases-container">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Reservá tu turno</h1>
          <p className="page-subtitle">
            Elegí uno de nuestros planes mensuales (Musculación, Solo Clases o
            Plan Full) y completá el pago con Mercado Pago. Tu turno queda
            reservado al confirmar el plan.
          </p>
        </div>
        <Planes />
      </div>
    </div>
  );
};

export default ReservaPage;
