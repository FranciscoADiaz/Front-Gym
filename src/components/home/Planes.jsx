import { useNavigate } from 'react-router';

const Planes = () => {
  const navigate = useNavigate();

  const planes = [
    { nombre: "Solo musculación", ruta: "musculacion" },
    { nombre: "Solo clases", ruta: "clases" },
    { nombre: "Plan Full", ruta: "full" },
  ];

  return (
    <section className="seccion-planes py-4">
      <h2>Nuestros planes mensuales</h2>
      <div className="d-flex flex-column align-items-start">
        {planes.map((plan, i) => (
          <button
            key={i}
            className="btn btn-outline-primary my-2"
            onClick={() => navigate(`/planes/${plan.ruta}`)}
          >
            {plan.nombre}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Planes;
