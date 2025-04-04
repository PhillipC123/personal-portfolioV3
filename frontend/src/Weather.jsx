import React, { useState, useEffect } from 'react';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Halifax&appid=${apiKey}&units=metric`);
        if (!response.ok) throw new Error('Network response was unsuccessful');

        const data = await response.json();
        setWeather({
          city: data.name,
          temperature: data.main.temp,
          humidity: data.main.humidity,
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, [apiKey]);

  if (!weather) return <p>Loading weather...</p>;

  return (
    <div className="weather-container mt-4">
      <h3>Current Weather Conditions in {weather.city}</h3>
      <p>Temperature: {weather.temperature}°C</p>
      <p>Humidity Level: {weather.humidity}%</p>
    </div>
  );
};

export default Weather;