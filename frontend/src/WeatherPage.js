// React
import React, { useEffect } from 'react';
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
  useEffect(() => {
    const source = axios.CancelToken.source();
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:4000/weather', {
          cancelToken: source.token
        });
        const weatherData = response.data;
        console.log(weatherData);
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
    fetchData();
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
                <a onClick={'s'}>
                  <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
                </a>
                <TextField id="input-with-sx" label="Enter a City" variant="standard" />
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
          <WeatherHero />
        </motion.div>
        <motion.div
          className="weather"
          variants={fadeIn('right', 0.3)}
          initial="hidden"
          whileInView={'show'}
          viewport={{ once: false, amount: 0.5 }}>
          <Forecast />
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
