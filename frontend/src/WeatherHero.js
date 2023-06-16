/* eslint-disable react/prop-types */
import React from 'react';
import { Container } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';

export default function WeatherHero({ weatherData, city }) {
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
  return (
    <div className="hero">
      <div className="hero-card">
        <h1>{city}</h1>
        <div className="hero-sun-time">
          <h2>
            <WbSunnyIcon /> {sunriseTime}
          </h2>
          <h2>
            <WbTwilightIcon /> {sunsetTime}
          </h2>
        </div>
      </div>
    </div>
  );
}
