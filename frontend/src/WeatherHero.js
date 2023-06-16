/* eslint-disable react/prop-types */
import React from 'react';
import { Container } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import sunny from './assets/sunny.png';
import cloudy from './assets/cloudy.png';
import rainy from './assets/rainy.png';
import snowy from './assets/snowy.png';
import { motion } from 'framer-motion';
import { fadeIn } from './variants';

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

  // Current temp
  const currentHour = new Date().getHours();
  const currentTemp = weatherData?.weatherData?.hourly?.temperature_2m[currentHour];

  // Cloudy Checker
  let cloudWeather;
  let cloudCoverArray = weatherData?.weatherData?.hourly?.cloudcover_high;
  let cloudSum = cloudCoverArray.reduce((a, b) => a + b, 0);
  let cloudAvg = cloudSum / cloudCoverArray.length;
  // not an actual metric right here:
  if (cloudAvg <= 15) {
    cloudWeather = false;
  } else {
    cloudWeather = true;
  }

  // Rainy Checker
  let rainWeather;
  let rainCoverArray = weatherData?.weatherData?.hourly?.rain;
  let rainSum = rainCoverArray.reduce((a, b) => a + b, 0);
  let rainAvg = rainSum / rainCoverArray.length;
  // not an actual metric right here:
  if (rainAvg <= 0.004) {
    rainWeather = false;
  } else {
    rainWeather = true;
  }

  // Snowy Checker
  let snowWeather;
  let snowCoverArray = weatherData?.weatherData?.hourly?.snowfall;
  let snowSum = snowCoverArray.reduce((a, b) => a + b, 0);
  let snowAvg = snowSum / snowCoverArray.length;
  // not an actual metric right here:
  if (snowAvg <= 15) {
    snowWeather = false;
  } else {
    snowWeather = true;
  }
  return (
    <motion.div
      className="hero"
      variants={fadeIn('right', 0.3)}
      initial="hidden"
      whileInView={'show'}
      viewport={{ once: false, amount: 0.5 }}>
      <div className="hero-card">
        <motion.div
          className="hero-container-1"
          variants={fadeIn('right', 0.3)}
          initial="hidden"
          whileInView={'show'}
          viewport={{ once: false, amount: 0.5 }}>
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
        </motion.div>
        <div className="hero-container-2">
          <motion.div
            variants={fadeIn('right', 0.3)}
            initial="hidden"
            whileInView={'show'}
            viewport={{ once: false, amount: 0.5 }}>
            {!cloudWeather && !rainWeather && !snowWeather && <img src={sunny}></img>}
            {cloudWeather && !rainWeather && !snowWeather && <img src={cloudy}></img>}
            {rainWeather && !snowWeather && <img src={rainy}></img>}
            {snowWeather && <img src={snowy}></img>}
            <div>
              <h1>{`${currentTemp}°`}</h1>
              <h1 className="hero-current-weather">
                {!cloudWeather && !rainWeather && !snowWeather && 'Sunny'}
                {cloudWeather && !rainWeather && !snowWeather && 'Cloudy'}
                {rainWeather && !snowWeather && 'Rainy'}
                {snowWeather && 'Snowy'}
              </h1>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
