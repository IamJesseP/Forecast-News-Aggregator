import { Container } from '@mui/material';
import React from 'react';

export default function Forecast() {
  return (
    <div className="forecast">
      <div className="forecast-left">
        <div className="card-left">Forecast 1</div>
        <div className="card-left">Forecast 2</div>
      </div>
      <div className="forecast-right">
        <div className="card-right"> Air Quality</div>
      </div>
    </div>
  );
}
