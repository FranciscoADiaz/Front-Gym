import React from "react";
import ComingSoon from "../components/common/ComingSoon";
import { FaTshirt } from "react-icons/fa";

const ProductoRopaPage = () => {
  return (
    <ComingSoon
      title="¡Próximamente!"
      subtitle="Sección de Ropa Deportiva"
      description="Estamos preparando la mejor colección de ropa deportiva.\n¡Muy pronto podrás encontrar camisetas, shorts y más!"
      pageTitle="Ropa Deportiva"
      icon={FaTshirt}
    />
  );
};

export default ProductoRopaPage;

