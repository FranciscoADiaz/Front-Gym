import { useEffect, useState } from "react";
import axios from "axios"; 

const apiKey = import.meta.env.VITE_API_KEY;

function Clima() {
  const [clima, setClima] = useState(null);

  useEffect(() => {
    async function obtenerClima() {
      try {
        const respuesta = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Tucuman,AR&appid=${apiKey}&units=metric&lang=es`);
        setClima(respuesta.data); 
      } catch (error) {
        console.error("Error al obtener el clima:", error);
      }
    }

    obtenerClima(); 
  }, []);

  console.log(clima);
  if (!clima) return <p>Cargando clima...</p>;

  return (
    <div>
      
      <span>{clima.name}</span>
      <p>
        🌡 {clima.main.temp}°C ☁ {clima.weather[0].description}
      </p>
    </div>
  );
}

export default Clima;
