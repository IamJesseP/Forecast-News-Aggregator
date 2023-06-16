/* eslint-disable react/prop-types */
import React from 'react';
import { Container } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import sunny from './assets/sunny.png';
import cloudy from './assets/cloudy.png';
import rainy from './assets/rainy.png';

export default function WeatherHero({ weatherData, city }) {
  // Sunrise and Sunset
  let sunriseArray = weatherData?.weatherData?.daily?.sunrise;
  let sunsetArray = weatherData?.weatherData?.daily?.sunset;
  let sunriseTime = new Date(sunriseArray[0]).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
  let sunsetTime = new Date(sunsetArray[0]).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  // Max / low temps
  let maxTemp = weatherData?.weatherData?.daily?.temperature_2m_max[0];
  let lowTemp = weatherData?.weatherData?.daily?.temperature_2m_min[0];

  // Curre
  const currentHour = new Date().getHours();
  const currentTemp = weatherData?.weatherData?.hourly?.temperature_2m[currentHour];
  console.log(currentTemp);
  return (
    <div className="hero">
      <div className="hero-card">
        <div className="hero-container-1">
          <h1>{city}</h1>
          <div className="hero-sun-time">
            <h2>
              <WbSunnyIcon /> {sunriseTime}
            </h2>
            <h2>
              <WbTwilightIcon /> {sunsetTime}
            </h2>
          </div>
          <div className="hero-low-high">
            <h2>{`L ${lowTemp}°`}</h2>
            <h2>{`H ${maxTemp}°`}</h2>
          </div>
        </div>
        <div className="hero-container-2">
          <div>
            <img src={sunny}></img>
            {/* <img src={rainy}></img>
            <img src={cloudy}></img> */}
            <h1>{currentTemp}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
