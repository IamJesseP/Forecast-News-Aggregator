// React
import React, { useEffect, useRef, useState } from 'react';
import WeatherHero from './WeatherHero';
import Forecast from './Forecast';
import Headlines from './Headlines';
import Notify from './Notify';
import Nav from './Nav';
import Greet from './utils/Greet';
import './styles.css';
// Material UI
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
// Framer
import { motion } from 'framer-motion';
import { fadeIn } from './variants';
// Data modeling
import axios from 'axios';

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState('');
  const [airQualityData, setAirQualityData] = useState('');
  const [searchedCity, setSearchedCity] = useState('San Diego');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const source = axios.CancelToken.source();

  async function fetchData(city, state) {
    try {
      // Weather Data
      const weatherResponse = await axios.get('http://localhost:4000/weather', {
        cancelToken: source.token,
        params: {
          city: city,
          state: state
        }
      });
      const weatherData = weatherResponse.data;
      setWeatherData(weatherData);
      // Air Quality Data
      const airQualityResponse = await axios.get('http://localhost:4000/airquality', {
        cancelToken: source.token,
        params: {
          city: city,
          state: state
        }
      });
      const airQualityData = airQualityResponse.data;
      setAirQualityData(airQualityData);
      setIsLoading(false);
      console.log(weatherData);
      console.log(airQualityData);
    } catch (error) {
      if (axios.isCancel(error)) {
        // Handle if request was cancelled
        console.log('Request cancelled', error.message);
      } else {
        // Handle usual errors
        console.log('Something went wrong: ', error.message);
      }
    }
  }

  async function handleSearch() {
    let searchArray;
    if (searchQuery.includes(',')) {
      searchArray = searchQuery.split(',');
    }
    if (!searchArray || searchArray.length !== 2) {
      console.log('Please provide City and State separated by a comma or a space');
      return;
    }
    let city = searchArray[0].trim();
    let state = searchArray[1].trim();
    setSearchedCity(city);
    fetchData(city, state);
  }

  useEffect(() => {
    setSearchQuery('San Diego, CA');
    handleSearch();
    // Cleanup function to cancel request on unmount
    return () => {
      source.cancel('Operation canceled by the user.');
    };
  }, []);

  return (
    <>
      <div className="content">
        <div>
          <Nav />
        </div>
        <div className="navbar" id="weather">
          <motion.div
            className="container"
            variants={fadeIn('right', 0.3)}
            initial="hidden"
            whileInView={'show'}
            viewport={{ once: false, amount: 0.5 }}>
            <div className="greeting">
              <h1>{Greet()}</h1>
            </div>
            <div className="search-field">
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <a onClick={handleSearch}>
                  <SearchIcon
                    sx={{ color: 'action.active', mr: 1, height: '30px', cursor: 'pointer' }}
                  />
                </a>
                <TextField
                  id="outlined-search"
                  label="City, State"
                  type="search"
                  className="searchbox"
                  size="small"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSearch();
                    }
                  }}
                />
              </Box>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="weather"
          variants={fadeIn('right', 0.3)}
          initial="hidden"
          whileInView={'show'}
          viewport={{ once: false, amount: 0.5 }}>
          {!isLoading && <WeatherHero weatherData={weatherData} city={searchedCity} />}
        </motion.div>
        <motion.div
          className="weather"
          variants={fadeIn('right', 0.3)}
          initial="hidden"
          whileInView={'show'}
          viewport={{ once: false, amount: 0.5 }}>
          {!isLoading && <Forecast weatherData={weatherData} airQualityData={airQualityData} />}
        </motion.div>
        <div className="spacer"></div>
        <motion.div
          className="weather"
          id="news"
          variants={fadeIn('right', 0.3)}
          initial="hidden"
          whileInView={'show'}
          viewport={{ once: false, amount: 0.5 }}>
          <Headlines />
        </motion.div>
        <div className="spacer"></div>
        <motion.div
          className="weather"
          id="sms"
          variants={fadeIn('right', 0.3)}
          initial="hidden"
          whileInView={'show'}
          viewport={{ once: false, amount: 0.5 }}>
          <Notify />
        </motion.div>
        <div className="spacer"></div>
      </div>
    </>
  );
}
