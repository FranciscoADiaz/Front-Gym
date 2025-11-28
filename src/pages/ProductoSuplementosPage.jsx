import React from "react";
import ComingSoon from "../components/common/ComingSoon";
import { FaCapsules } from "react-icons/fa";

const ProductoSuplementosPage = () => {
  return (
    <ComingSoon
      title="¡Próximamente!"
      subtitle="Sección de Suplementos"
      description="Estamos trabajando para traerte la mejor selección de suplementos.\n¡Muy pronto podrás encontrar proteínas, creatinas y más!"
      pageTitle="Suplementos"
      icon={FaCapsules}
    />
  );
};

export default ProductoSuplementosPage;

