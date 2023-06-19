import React, { useState } from 'react';
import './styles.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';
import Spline from '@splinetool/react-spline';

export default function Notify() {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneResponse, setPhoneResponse] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = 'https://the-weather-news-aggr-b8c24050aa8e.herokuapp.com/phone/savephone'; // Replace with your API url

    try {
      const response = await axios.post(url, {
        city,
        state,
        phoneNumber
      });
      const responseData = response.data.msg;
      setPhoneResponse(responseData);
    } catch (error) {
      console.log('An error occurred while saving the data:', error);
    }
  };

  return (
    <div className="notify">
      <div className="notify-title-2">
        <h1>Get your weather, 24 hours on the dot.</h1>
        <div className="notify-clock">
          <Spline scene="https://prod.spline.design/KhXZgdzD96vatfex/scene.splinecode" />
        </div>
      </div>
      <div className="notify-card">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 300,
            m: 'auto',
            gap: 2
          }}>
          <h1 className="notify-title">Daily Weather Notifications</h1>
          <TextField
            value={city}
            onChange={(e) => setCity(e.target.value)}
            label="City"
            className="notify-form"
          />
          <TextField
            value={state}
            onChange={(e) => setState(e.target.value)}
            label="State"
            className="notify-form"
          />
          <TextField
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            label="Phone Number"
            className="notify-form"
          />
          <Button variant="contained" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
          {phoneResponse && <h3>{phoneResponse}</h3>}
        </Box>
      </div>
    </div>
  );
}
