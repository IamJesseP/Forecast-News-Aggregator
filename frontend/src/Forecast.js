/* eslint-disable react/prop-types */
import { Container } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import forecastSun from './assets/forecast-sun.png';
import forecastSunrise from './assets/forecast-sunrise.png';
import forecastSunset from './assets/forecast-sunset.png';
import dailyRain from './assets/daily-rain.png';
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

  let uvIndexArray = weatherData?.weatherData?.daily?.uv_index_max[0];
  let dailyRainfall = weatherData?.weatherData?.daily?.rain_sum[0];
  return (
    <div className="forecast">
      <div className="forecast-left">
        <div className="card-left-1">
          <div className="forecast-uv">
            <img src={forecastSun} width="36px"></img>
            <div>
              <h2>UV Index</h2>
              <h3>{uvIndexArray} of 10</h3>
            </div>
          </div>
          <div className="forecast-divider"></div>
          <div className="forecast-sun-time">
            <h2>
              <img src={forecastSunrise} width="36px"></img> {sunriseTime}
            </h2>
            <h2>
              <img src={forecastSunset} width="36px"></img> {sunsetTime}
            </h2>
          </div>
        </div>
        <div className="card-left-2">
          <div className="daily-rain-left">
            <h2>Daily rainfall</h2>
            <h3>{dailyRainfall} inches</h3>
          </div>
          <div className="daily-rain-right">
            <img src={dailyRain} width="36px"></img>
          </div>
        </div>
      </div>
      <div className="forecast-right">
        <div className="card-right">Air Quality</div>
      </div>
    </div>
  );
}
