import React from 'react';
import WeatherHero from './WeatherHero';
import Forecast from './Forecast';
import Headlines from './Headlines';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import './styles.css';

export default function WeatherPage() {
  return (
    <>
      <div className="content">
        <div className="navbar">
          <div className="container">
            <div className="greeting">
              <h1>Good Morning!</h1>{' '}
            </div>
            <div className="search-field">
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <a href="#">
                  <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
                </a>
                <TextField id="input-with-sx" label="Enter a City" variant="standard" />
              </Box>
            </div>
          </div>
        </div>
        <div className="weather">
          <WeatherHero />
        </div>
        <div className="weather">
          <Forecast />
        </div>
        <div className="weather">
          <Headlines />
        </div>
      </div>
    </>
  );
}
