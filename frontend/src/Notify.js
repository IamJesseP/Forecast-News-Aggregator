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
  const [phoneForm, setPhoneForm] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPhoneResponse('');
    const saveUrl = 'https://the-weather-news-aggr-b8c24050aa8e.herokuapp.com/phone/savephone';
    const deleteUrl = 'https://the-weather-news-aggr-b8c24050aa8e.herokuapp.com/phone/deletephone';
    try {
      if (!phoneForm) {
        const response = await axios.post(saveUrl, {
          city,
          state,
          phoneNumber
        });
        const responseData = response.data.msg;
        setPhoneResponse(responseData);
      } else {
        const response = await axios.delete(`${deleteUrl}?phoneNumber=${phoneNumber}`);
        const responseData = response.data.msg;
        setPhoneResponse(responseData);
      }
    } catch (error) {
      console.log('An error occurred while saving the data:', error);
      setPhoneResponse(error.response.data.msg || 'An unexpected error occurred.');
    }
  };

  return (
    <div className="notify" id="sms">
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
          {!phoneForm && (
            <>
              <TextField
                value={city}
                onChange={(e) => setCity(e.target.value)}
                label="City"
                className="notify-form"
                required
              />
              <TextField
                value={state}
                onChange={(e) => setState(e.target.value)}
                label="State"
                className="notify-form"
                required
              />
            </>
          )}
          <TextField
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            label="Phone Number"
            className="notify-form"
            required
          />
          <Button variant="contained" type="submit" onClick={handleSubmit}>
            {!phoneForm && 'Subscribe'}
            {phoneForm && 'Unsubscribe'}
          </Button>
          <h3 style={{ color: 'black', maxWidth: '150px' }}>
            <a
              onClick={() => {
                setPhoneForm((prevState) => !prevState);
              }}
              style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
              {!phoneForm && 'Unsubscribe here'}
              {phoneForm && 'Sign up here'}
            </a>
          </h3>
          <h3 style={{ color: 'black', maxWidth: '150px' }}>{phoneResponse}</h3>
        </Box>
      </div>
    </div>
  );
}
