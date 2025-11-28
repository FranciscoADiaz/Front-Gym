import React from "react";
import ComingSoon from "../components/common/ComingSoon";
import { FaDumbbell } from "react-icons/fa";

const ProductoAccesoriosPage = () => {
  return (
    <ComingSoon
      title="¡Próximamente!"
      subtitle="Sección de Accesorios"
      description="Estamos preparando la mejor selección de accesorios deportivos.\n¡Muy pronto podrás encontrar guantes, cinturones y más!"
      pageTitle="Accesorios"
      icon={FaDumbbell}
    />
  );
};

export default ProductoAccesoriosPage;

