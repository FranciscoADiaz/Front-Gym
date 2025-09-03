import FormularioReserva from "../components/forms/FormularioReserva";
import ListaReservas from "../components/forms/ListaReservas";
import { useState } from "react";
import { useChangeTitle } from "../helpers/useChangeTitlePage";
import "./ReservaPage.css";

const ReservaPage = () => {
  useChangeTitle("Mis Clases");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleReservada = () => {
    setRefreshKey((k) => k + 1);
  };

  return (
    <div className="mis-clases-container">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Mis Clases</h1>
          <p className="page-subtitle">Reserva y gestiona tus clases</p>
        </div>
        <FormularioReserva onReservada={handleReservada} />
        <ListaReservas refreshKey={refreshKey} />
      </div>
    </div>
  );
};

export default ReservaPage;
