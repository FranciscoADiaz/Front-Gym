import React from "react";
import "./PublicidadC.css";

const PublicidadC = () => {
  return (
    <div className="publicidad-section">
      <picture>
        <source
          srcset="https://res.cloudinary.com/dylrki81z/image/upload/v1750546527/gifgran_olwmj3.gif"
          media="(min-width: 992px)"
        />
        <source
          srcset="https://res.cloudinary.com/dylrki81z/image/upload/v1750546527/gifmed_la2tgx.gif"
          media="(min-width: 577px) and (max-width: 991px)"
        />
        <img
          src="https://res.cloudinary.com/dylrki81z/image/upload/v1750546527/gifpeq_ddsxyk.gif"
          alt="Publicidad Patitas Felices"
          className="publicidad-gif"
        />
      </picture>
    </div>
  );
};

export default PublicidadC;
