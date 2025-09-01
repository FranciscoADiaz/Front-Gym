import { useEffect, useState } from "react";
import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

// Función para obtener el icono del clima según el código de OpenWeatherMap
const getWeatherIcon = (weatherCode, isDay = true) => {
  // Códigos de OpenWeatherMap: https://openweathermap.org/weather-conditions
  const iconMap = {
    // Cielo despejado
    800: isDay ? "☀️" : "🌙",

    // Nubes
    801: "🌤️", // pocas nubes
    802: "⛅", // nubes dispersas
    803: "☁️", // nubes rotas
    804: "☁️", // nubes nubladas

    // Lluvia
    200: "⛈️", // tormenta con lluvia ligera
    201: "⛈️", // tormenta con lluvia
    202: "⛈️", // tormenta con lluvia fuerte
    210: "🌩️", // tormenta ligera
    211: "⛈️", // tormenta
    212: "⛈️", // tormenta fuerte
    221: "⛈️", // tormenta violenta
    230: "⛈️", // tormenta con llovizna ligera
    231: "⛈️", // tormenta con llovizna
    232: "⛈️", // tormenta con llovizna fuerte

    // Lluvia
    300: "🌦️", // llovizna ligera
    301: "🌦️", // llovizna
    302: "🌧️", // llovizna intensa
    310: "🌧️", // llovizna ligera
    311: "🌧️", // llovizna
    312: "🌧️", // llovizna intensa
    313: "🌧️", // lluvia y llovizna
    314: "🌧️", // lluvia fuerte y llovizna
    321: "🌧️", // llovizna

    500: "🌦️", // lluvia ligera
    501: "🌧️", // lluvia moderada
    502: "🌧️", // lluvia intensa
    503: "🌧️", // lluvia muy intensa
    504: "🌧️", // lluvia extrema
    511: "🌨️", // lluvia helada
    520: "🌦️", // lluvia ligera
    521: "🌧️", // lluvia
    522: "🌧️", // lluvia intensa
    531: "🌧️", // lluvia muy intensa

    // Nieve
    600: "🌨️", // nieve ligera
    601: "🌨️", // nieve
    602: "❄️", // nieve intensa
    611: "🌨️", // aguanieve
    612: "🌨️", // aguanieve ligera
    613: "🌨️", // aguanieve
    615: "🌨️", // lluvia ligera y nieve
    616: "🌨️", // lluvia y nieve
    620: "🌨️", // aguanieve ligera
    621: "🌨️", // aguanieve
    622: "❄️", // aguanieve intensa

    // Atmósfera
    701: "🌫️", // neblina
    711: "🌫️", // bruma
    721: "🌫️", // neblina
    731: "🌪️", // remolinos de arena
    741: "🌫️", // niebla
    751: "🌫️", // arena
    761: "🌫️", // polvo
    762: "🌋", // ceniza volcánica
    771: "💨", // ráfagas
    781: "🌪️", // tornado

    // Nubes
    801: "🌤️", // pocas nubes
    802: "⛅", // nubes dispersas
    803: "☁️", // nubes rotas
    804: "☁️", // nubes nubladas
  };

  return iconMap[weatherCode] || "🌡️";
};

// Función para obtener el color del clima
const getWeatherColor = (temp) => {
  if (temp >= 30) return "text-danger"; // Muy caliente
  if (temp >= 25) return "text-warning"; // Caliente
  if (temp >= 15) return "text-success"; // Templado
  if (temp >= 5) return "text-info"; // Fresco
  return "text-primary"; // Frío
};

function Clima() {
  const [clima, setClima] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function obtenerClima() {
      try {
        setLoading(true);
        setError(null);

        const respuesta = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Tucuman,AR&appid=${apiKey}&units=metric&lang=es`
        );

        setClima(respuesta.data);
      } catch (error) {
        console.error("Error al obtener el clima:", error);
        setError("No se pudo cargar el clima");
      } finally {
        setLoading(false);
      }
    }

    obtenerClima();

    // Actualizar cada 30 minutos
    const interval = setInterval(obtenerClima, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="weather-widget loading">
        <div className="weather-icon">🌡️</div>
        <div className="weather-info">
          <div className="weather-location">Cargando...</div>
          <div className="weather-temp">--°C</div>
        </div>
      </div>
    );
  }

  if (error || !clima) {
    return (
      <div className="weather-widget error">
        <div className="weather-icon">🌡️</div>
        <div className="weather-info">
          <div className="weather-location">Tucumán</div>
          <div className="weather-temp">--°C</div>
        </div>
      </div>
    );
  }

  const weatherIcon = getWeatherIcon(clima.weather[0].id, true);
  const tempColor = getWeatherColor(clima.main.temp);
  const tempRounded = Math.round(clima.main.temp);

  return (
    <div className="weather-widget">
      <div className="weather-icon">{weatherIcon}</div>
      <div className="weather-info">
        <div className="weather-location">{clima.name}</div>
        <div className={`weather-temp ${tempColor}`}>{tempRounded}°C</div>
        <div className="weather-desc">{clima.weather[0].description}</div>
      </div>
    </div>
  );
}

export default Clima;
