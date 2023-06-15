import React from 'react';
import WeatherHero from './WeatherHero';
import Forecast from './Forecast';
import './styles.css';

export default function WeatherPage() {
  return (
    <>
      <div className="flex_center">
        <WeatherHero />
      </div>
      <div className="flex_center">
        <Forecast />
      </div>
    </>
  );
}
