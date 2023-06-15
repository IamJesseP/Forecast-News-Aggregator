import { Container } from '@mui/material';
import React from 'react';

export default function Forecast() {
  return (
    <div className="forecast">
      <div className="forecast-left">
        <Container className="card forecast-left-1"></Container>
        <Container className="card forecast-left-2"></Container>
      </div>
      <Container className="forecast-right card" maxWidth="xl"></Container>
    </div>
  );
}
