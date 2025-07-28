import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./CarouselC.css";

const carouselData = [
  {
    image:
      "https://res.cloudinary.com/dylrki81z/image/upload/v1750544384/carousel1_necewg.png",
    alt: "Imagen1",
    patitasColor: "#000000",
    felicesColor: "#009688",
    slogan:
      "Cada lamida y ronroneo nos recuerda la confianza que depositan en nosotros.",
  },
  {
    image:
      "https://res.cloudinary.com/dylrki81z/image/upload/v1750544386/carousel2_tsvsm2.png",
    alt: "Imagen2",
    patitasColor: "#009688",
    felicesColor: "#000000",
    slogan:
      "Combinamos experiencia veterinaria, con un profundo amor por los animales.",
  },
  {
    image:
      "https://res.cloudinary.com/dylrki81z/image/upload/v1750544385/carousel3_saq2vp.png",
    alt: "Imagen3",
    patitasColor: "#ffc107",
    felicesColor: "#000000",
    slogan: "Más que una veterinaria, somos una familia que cuida la tuya.",
  },
];

const CarouselC = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [weatherError, setWeatherError] = useState(false);

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
      const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`;

      try {
        const response = await fetch(WEATHER_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setWeatherError(true);
      } finally {
        setLoadingWeather(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        () => {
          const defaultLat = -24.185;
          const defaultLon = -65.304;
          fetchWeather(defaultLat, defaultLon);
        }
      );
    } else {
      const defaultLat = -24.185;
      const defaultLon = -65.304;
      fetchWeather(defaultLat, defaultLon);
    }
  }, []);

  const getWeatherIcon = (iconCode) => {
    if (!iconCode) return "☀️";
    const iconMap = {
      "01d": "☀️",
      "01n": "🌙",
      "02d": "⛅",
      "02n": "☁️",
      "03d": "☁️",
      "03n": "☁️",
      "04d": "☁️",
      "04n": "☁️",
      "09d": "🌧️",
      "09n": "🌧️",
      "10d": "🌦️",
      "10n": "🌧️",
      "11d": "⛈️",
      "11n": "⛈️",
      "13d": "❄️",
      "13n": "❄️",
      "50d": "🌫️",
      "50n": "🌫️",
    };
    return iconMap[iconCode] || "☀️";
  };

  const getDayOfWeek = () => {
    const days = [
      "DOMINGO",
      "LUNES",
      "MARTES",
      "MIÉRCOLES",
      "JUEVES",
      "VIERNES",
      "SÁBADO",
    ];
    const date = new Date();
    return days[date.getDay()];
  };

  return (
    <div className="hero-section">
      <Carousel
        fade
        controls={false}
        indicators={false}
        interval={5000}
        className="full-width-carousel"
      >
        {carouselData.map((slide, index) => (
          <Carousel.Item key={index}>
            <img
              src={slide.image}
              alt={slide.alt}
              className="d-block w-100 img-fluid carousel-img"
            />
            <div className="hero-overlay-content">
              <Container>
                <Row className="justify-content-start">
                  <Col
                    xs={12}
                    md={8}
                    className="text-start text-md-start d-flex flex-column justify-content-center align-items-start align-items-md-start"
                  >
                    <h1 className="hero-title mb-2">
                      <span
                        className="hero-title-part1"
                        style={{ color: slide.patitasColor }}
                      >
                        PATITAS
                      </span>
                      <span
                        className="hero-title-part2"
                        style={{ color: slide.felicesColor }}
                      >
                        FELICES
                      </span>
                    </h1>
                    <p className="hero-subtitle">{slide.slogan}</p>                    
                  </Col>
                </Row>
              </Container>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="weather-widget-container">
        {loadingWeather ? (
          <span>Cargando clima...</span>
        ) : weatherError ? (
          <span>Error al cargar el clima.</span>
        ) : weatherData ? (
          <span>
            {getDayOfWeek()} {Math.round(weatherData.main.temp)}º C{" "}
            <span className="weather-emoji">
              {getWeatherIcon(weatherData.weather[0].icon)}
            </span>
          </span>
        ) : (
          <span>
            MARTES 18º C <span className="weather-emoji">☀️</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default CarouselC;
