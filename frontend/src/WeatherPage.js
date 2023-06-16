import React from 'react';
import WeatherHero from './WeatherHero';
import Forecast from './Forecast';
import Headlines from './Headlines';
import Notify from './Notify';
import Box from '@mui/material/Box';
import Nav from './Nav';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import { fadeIn } from './variants';
import './styles.css';

export default function WeatherPage() {
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
        <div className="spacer">
          {/* <Spline scene="https://prod.spline.design/r7dtNZJx8L-6P264/scene.splinecode" /> */}
        </div>
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
