/* eslint-disable react/prop-types */
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';

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
        label: 'PM10',
        data: pm10Values,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.7)',
        hoverBorderColor: 'rgba(75,192,192,1)'
      }
    ]
  };
  const options = {
    scales: {
      x: {
        ticks: {
          maxRotation: 0,
          autoSkip: true
        }
      }
    }
  };
  return (
    <div style={{ width: '100%', height: '300px' }}>
      <Line data={data} options={options} />;
    </div>
  );
}
