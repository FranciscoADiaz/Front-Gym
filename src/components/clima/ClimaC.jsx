import { useEffect, useState } from "react";
const apiKey = import.meta.env.VITE_API_KEY;
const url = `https://api.openweathermap.org/data/2.5/weather?q=Tucuman,AR&appid=${apiKey}&units=metric&lang=es`;
function Clima() {
  const [clima, setClima] = useState(null);

  useEffect(() => {
    async function obtenerClima() {
      const respuesta = await fetch(
        url
      );
      const datos = await respuesta.json();
      setClima(datos);
    }
    obtenerClima();
  }, []);

  if (!clima) return <p>Cargando clima...</p>;

  return (
    <div>
      <spam>{clima.name}</spam>
      <p>
        🌡 {clima.main.temp}°C ☁ {clima.weather[0].description}
      </p>
    </div>
  );
}

export default Clima;
