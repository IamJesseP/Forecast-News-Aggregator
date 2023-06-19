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
import LoadingButton from '@mui/lab/LoadingButton';
// Framer
import { motion } from 'framer-motion';
import { fadeIn } from './variants';
// Data
import axios from 'axios';

export default function WeatherPage() {
  const [renderKey, setRenderKey] = useState(0);
  const [weatherData, setWeatherData] = useState('');
  const [airQualityData, setAirQualityData] = useState('');
  const [newsData, setNewsData] = useState('');
  const [aiData, setAIData] = useState('');
  const [searchedCity, setSearchedCity] = useState('San Diego');
  const [isLoading, setIsLoading] = useState(true);
  const source = axios.CancelToken.source();
  const searchInputRef = useRef(null);

  async function fetchData(city, state) {
    const dataPromises = [
      handleOpenAIData(city, state),
      handleWeather(city, state),
      handleAirQualityData(city, state),
      handleNewsData(city, state)
    ];

    try {
      await Promise.all(dataPromises);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  async function handleWeather(city, state) {
    try {
      // Weather Data
      const weatherResponse = await axios.get(
        'https://the-weather-news-aggr-b8c24050aa8e.herokuapp.com/weather',
        {
          cancelToken: source.token,
          params: {
            city: city,
            state: state
          }
        }
      );
      const weatherData = weatherResponse.data;
      setWeatherData(weatherData);
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
  async function handleAirQualityData(city, state) {
    try {
      //air quality data
      const airQualityResponse = await axios.get(
        'https://the-weather-news-aggr-b8c24050aa8e.herokuapp.com/airquality',
        {
          cancelToken: source.token,
          params: {
            city: city,
            state: state
          }
        }
      );
      const airQualityData = airQualityResponse.data;

      setAirQualityData(airQualityData);
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
  async function handleNewsData(city, state) {
    try {
      //air quality data
      // News Data
      const newsResponse = await axios.get(
        'https://the-weather-news-aggr-b8c24050aa8e.herokuapp.com/news',
        {
          cancelToken: source.token,
          params: {
            city: city,
            state: state
          }
        }
      );
      const newsData = newsResponse.data;
      setNewsData(newsData);
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
  async function handleOpenAIData(city, state) {
    try {
      // openai
      const aiResponse = await axios.get(
        'https://the-weather-news-aggr-b8c24050aa8e.herokuapp.com/openai',
        {
          cancelToken: source.token,
          params: {
            city: city,
            state: state
          }
        }
      );
      const aiData = aiResponse.data.message;
      setAIData(aiData);
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
    let searchInput = searchInputRef.current.value;

    let searchArray;
    if (searchInput.includes(',')) {
      searchArray = searchInput.split(',');
    }
    if (!searchArray || searchArray.length !== 2) {
      console.log('Please provide City and State separated by a comma or a space');
      return;
    }
    let city = searchArray[0].trim();
    let state = searchArray[1].trim();
    setSearchedCity(city);
    fetchData(city, state);
    setRenderKey((prevKey) => prevKey + 1);
  }

  useEffect(() => {
    fetchData('San Diego', 'CA');
  }, []);

  return (
    <>
      <div className="content">
        <div>
          <Nav />
        </div>
        <div className="navbar" id="weather">
          <motion.div
            key={`motion-div-1-${renderKey}`}
            className="container"
            variants={fadeIn('right', 0.3)}
            initial="hidden"
            whileInView={'show'}
            viewport={{ once: false, amount: 0.5 }}>
            <div className="greeting">
              <h1>{Greet()}</h1>
            </div>
            <div className="search-field">
              <Box color="white" sx={{ display: 'flex', alignItems: 'flex-end' }}>
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
                  color="white"
                  inputRef={searchInputRef}
                  defaultValue=""
                  sx={{ input: { color: '#ffffff' } }}
                  focused
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
          key={`motion-div-2-${renderKey}`}
          className="weather"
          variants={fadeIn('right', 0.3)}
          initial="hidden"
          whileInView={'show'}
          viewport={{ once: false, amount: 0.5 }}>
          {isLoading ? (
            <LoadingButton
              loading
              variant="outlined"
              sx={{ mt: 1, ml: 1, width: '100%', height: '500px' }}>
              Loading Weather Data
            </LoadingButton>
          ) : (
            <WeatherHero
              weatherData={weatherData}
              city={searchedCity}
              aiData={aiData}
              key={renderKey}
            />
          )}
        </motion.div>
        <motion.div
          key={`motion-div-3-${renderKey}`}
          className="weather"
          variants={fadeIn('right', 0.3)}
          initial="hidden"
          whileInView={'show'}
          viewport={{ once: false, amount: 0.5 }}>
          {isLoading ? (
            <LoadingButton
              loading
              variant="outlined"
              sx={{ mt: 1, ml: 1, width: '100%', height: '500px' }}>
              Loading Weather Data
            </LoadingButton>
          ) : (
            <Forecast weatherData={weatherData} airQualityData={airQualityData} />
          )}
        </motion.div>

        <motion.div
          key={`motion-div-4-${renderKey}`}
          className="news"
          variants={fadeIn('right', 0.3)}
          initial="hidden"
          whileInView={'show'}
          viewport={{ once: false, amount: 0.5 }}>
          {isLoading ? (
            <LoadingButton
              loading
              variant="outlined"
              sx={{ mt: 1, ml: 1, width: '100%', height: '500px' }}>
              Loading Weather Data
            </LoadingButton>
          ) : (
            <Headlines city={searchedCity} newsData={newsData} />
          )}
        </motion.div>

        <motion.div
          key={`motion-div-5-${renderKey}`}
          className="weather"
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
