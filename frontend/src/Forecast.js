/* eslint-disable react/prop-types */
import { Container } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import React from 'react';

export default function Forecast({ weatherData }) {
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
  return (
    <div className="forecast">
      <div className="forecast-left">
        <div className="card-left">
          <div className="forecast-uv">test</div>
          <div className="forecast-sun-time">
            <h2>
              <WbSunnyIcon /> {sunriseTime}
            </h2>
            <h2>
              <WbTwilightIcon /> {sunsetTime}
            </h2>
          </div>
        </div>
        <div className="card-left">Forecast 2</div>
      </div>
      <div className="forecast-right">
        <div className="card-right"> Air Quality</div>
      </div>
    </div>
  );
}
