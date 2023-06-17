/* eslint-disable react/prop-types */
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { CategoryScale, Chart } from 'chart.js/auto';

Chart.register(CategoryScale);

export default function AirQualityChart({ airQualityData }) {
  const rawTimes = airQualityData?.airQualityData?.hourly?.time;
  const pm10Values = airQualityData?.airQualityData?.hourly?.us_aqi_pm10;

  let times = rawTimes.map((time) => {
    const date = new Date(time);
    return date.toLocaleString('en-US', { month: 'short', day: '2-digit', hour: '2-digit' });
  });

  const data = {
    labels: times,
    datasets: [
      {
        label: 'US AQI',
        data: pm10Values,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(61, 115, 148, 0.911)',
        hoverBorderColor: 'rgba(61, 115, 148, 0.911)',
        fill: false
      }
    ]
  };
  const options = {
    scales: {
      x: {
        ticks: {
          maxRotation: 0,
          autoSkip: true,
          autoSkipPadding: 15
        }
      }
    }
  };
  return (
    <>
      <div style={{ height: '10%' }}>
        <h2 style={{ color: 'black' }}>Air Quality Index</h2>
      </div>
      <div style={{ width: '100%', height: '90%' }}>
        <Line data={data} options={options} />;
      </div>
    </>
  );
}
