
const Profesores = () => {
  const lista = [
    { nombre: "Lucas Gómez", especialidad: "Musculación", turno: "Mañana" },
    { nombre: "Carla Ruiz", especialidad: "Funcional", turno: "Tarde" },
    { nombre: "Matías Pérez", especialidad: "Zumba", turno: "Noche" }
  ];

  return (
    <section className="seccion-profesores py-4">
      <h2>👨‍🏫 Nuestro equipo de profesores</h2>
      <ul>
        {lista.map((profe, i) => (
          <li key={i}>
            <strong>{profe.nombre}</strong> – {profe.especialidad} ({profe.turno})
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Profesores;
