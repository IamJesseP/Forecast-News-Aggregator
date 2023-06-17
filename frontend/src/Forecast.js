/* eslint-disable react/prop-types */
import forecastSun from './assets/forecast-sun.png';
import forecastSunrise from './assets/forecast-sunrise.png';
import forecastSunset from './assets/forecast-sunset.png';
import dailyRain from './assets/daily-rain.png';
import React, { useState, useEffect } from 'react';
import AirQualityChart from './AirQualityChart';
import snowyIcon from './assets/snowyIcon.png';
import sunnyIcon from './assets/sunnyIcon.png';
import cloudyIcon from './assets/cloudyIcon.png';
import rainyIcon from './assets/rainyIcon.png';

export default function Forecast({ weatherData, airQualityData }) {
  // Sunrise and Sunset
  const [averageTemp, setAverageTemp] = useState([]);
  const [rainWeather, setRainWeather] = useState([]);
  const [snowWeather, setSnowWeather] = useState([]);
  const [cloudWeather, setCloudWeather] = useState([]);
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
  let rainWeatherArray = [];
  let snowWeatherArray = [];
  let cloudWeatherArray = [];
  let tempArray = [];
  useEffect(() => {
    for (let i = 0; i < 7; i++) {
      // Rainy Checker
      let rainCover = weatherData?.weatherData?.daily?.rain_sum[i];
      // not an actual metric right here:
      if (rainCover <= 0.004) {
        rainWeatherArray.push(false);
      } else {
        rainWeatherArray.push(true);
      }

      // Snowy Checker
      let snowCover = weatherData?.weatherData?.daily?.snowfall_sum[0];
      // not an actual metric right here:
      if (snowCover <= 15) {
        snowWeatherArray.push(false);
      } else {
        snowWeatherArray.push(true);
      }

      // Cloudy Checker
      let startHour, endHour;
      switch (i) {
        case 0:
          startHour = 0;
          endHour = 24;
          break;
        case 1:
          startHour = 24;
          endHour = 48;
          break;
        case 2:
          startHour = 48;
          endHour = 72;
          break;
        case 3:
          startHour = 72;
          endHour = 96;
          break;
        case 4:
          startHour = 96;
          endHour = 120;
          break;
        case 5:
          startHour = 120;
          endHour = 144;
          break;
        case 6:
          startHour = 144;
          endHour = 168;
          break;
        default:
          startHour = 0;
          endHour = 24;
      }

      let cloudCoverArray = weatherData?.weatherData?.hourly?.cloudcover.slice(startHour, endHour);
      let cloudSum = cloudCoverArray.reduce((a, b) => a + b, 0);
      let cloudAvg = cloudSum / cloudCoverArray.length;
      if (cloudAvg <= 5) {
        cloudWeatherArray[i] = false;
      } else {
        cloudWeatherArray[i] = true;
      }

      // Max / low temps

      let maxTemp = weatherData?.weatherData?.daily?.temperature_2m_max[i];
      let lowTemp = weatherData?.weatherData?.daily?.temperature_2m_min[i];
      tempArray[i] = Math.floor((lowTemp + maxTemp) / 2);
    }
    setAverageTemp(tempArray);
    setCloudWeather(cloudWeatherArray);
    setRainWeather(rainWeatherArray);
    setSnowWeather(snowWeatherArray);
  }, [weatherData]);

  let uvIndexArray = weatherData?.weatherData?.daily?.uv_index_max[0];
  let dailyRainfall = weatherData?.weatherData?.daily?.rain_sum[0];
  console.log('Rain Weather:', rainWeather);
  console.log('Snow Weather:', snowWeather);
  console.log('Cloud Weather:', cloudWeather);
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
        <div className="card-right">
          <div className="forecast-graph">
            <AirQualityChart airQualityData={airQualityData} />
          </div>
          <div className="forecast-week">
            <div className="forecast-week-column">
              <p>Mon</p>
              <div>
                {!cloudWeather[0] && !rainWeather[0] && !snowWeather[0] && (
                  <img src={sunnyIcon}></img>
                )}
                {cloudWeather[0] && !rainWeather[0] && !snowWeather[0] && (
                  <img src={cloudyIcon}></img>
                )}
                {rainWeather[0] && !snowWeather[0] && <img src={rainyIcon}></img>}
                {snowWeather[0] && <img src={snowyIcon}></img>}
                <h2>{`${averageTemp[0]}°`}</h2>
              </div>
            </div>
            <div className="forecast-divider"></div>
            <div className="forecast-week-column">
              <p>Tue</p>
              <div>
                {!cloudWeather[1] && !rainWeather[1] && !snowWeather[1] && (
                  <img src={sunnyIcon}></img>
                )}
                {cloudWeather[1] && !rainWeather[1] && !snowWeather[1] && (
                  <img src={cloudyIcon}></img>
                )}
                {rainWeather[1] && !snowWeather[1] && <img src={rainyIcon}></img>}
                {snowWeather[1] && <img src={snowyIcon}></img>}
                <h2>{`${averageTemp[1]}°`}</h2>
              </div>
            </div>
            <div className="forecast-divider"></div>
            <div className="forecast-week-column">
              <p>Wed</p>
              <div>
                {!cloudWeather[2] && !rainWeather[2] && !snowWeather[2] && (
                  <img src={sunnyIcon}></img>
                )}
                {cloudWeather[2] && !rainWeather[2] && !snowWeather[2] && (
                  <img src={cloudyIcon}></img>
                )}
                {rainWeather[2] && !snowWeather[2] && <img src={rainyIcon}></img>}
                {snowWeather[2] && <img src={snowyIcon}></img>}
                <h2>{`${averageTemp[2]}°`}</h2>
              </div>
            </div>
            <div className="forecast-divider"></div>
            <div className="forecast-week-column">
              <p>Thu</p>
              <div>
                {!cloudWeather[3] && !rainWeather[3] && !snowWeather[3] && (
                  <img src={sunnyIcon}></img>
                )}
                {cloudWeather[3] && !rainWeather[3] && !snowWeather[3] && (
                  <img src={cloudyIcon}></img>
                )}
                {rainWeather[3] && !snowWeather[3] && <img src={rainyIcon}></img>}
                {snowWeather[3] && <img src={snowyIcon}></img>}
                <h2>{`${averageTemp[3]}°`}</h2>
              </div>
            </div>
            <div className="forecast-divider"></div>
            <div className="forecast-week-column">
              <p>Fri</p>
              <div>
                {!cloudWeather[4] && !rainWeather[4] && !snowWeather[4] && (
                  <img src={sunnyIcon}></img>
                )}
                {cloudWeather[4] && !rainWeather[4] && !snowWeather[4] && (
                  <img src={cloudyIcon}></img>
                )}
                {rainWeather[4] && !snowWeather[4] && <img src={rainyIcon}></img>}
                {snowWeather[4] && <img src={snowyIcon}></img>}
                <h2>{`${averageTemp[4]}°`}</h2>
              </div>
            </div>
            <div className="forecast-divider"></div>
            <div className="forecast-week-column">
              <p>Sat</p>
              <div>
                {!cloudWeather[5] && !rainWeather[5] && !snowWeather[5] && (
                  <img src={sunnyIcon}></img>
                )}
                {cloudWeather[5] && !rainWeather[5] && !snowWeather[5] && (
                  <img src={cloudyIcon}></img>
                )}
                {rainWeather[5] && !snowWeather[5] && <img src={rainyIcon}></img>}
                {snowWeather[5] && <img src={snowyIcon}></img>}
                <h2>{`${averageTemp[5]}°`}</h2>
              </div>
            </div>
            <div className="forecast-divider"></div>
            <div className="forecast-week-column">
              <p>Sun</p>
              <div>
                {!cloudWeather[6] && !rainWeather[6] && !snowWeather[6] && (
                  <img src={sunnyIcon}></img>
                )}
                {cloudWeather[6] && !rainWeather[6] && !snowWeather[6] && (
                  <img src={cloudyIcon}></img>
                )}
                {rainWeather[6] && !snowWeather[6] && <img src={rainyIcon}></img>}
                {snowWeather[6] && <img src={snowyIcon}></img>}
                <h2>{`${averageTemp[6]}°`}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
