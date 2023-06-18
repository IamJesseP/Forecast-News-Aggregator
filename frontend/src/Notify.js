import React, { useState } from 'react';
import './styles.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function Notify() {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle the submit logic
  };

  return (
    <div className="notify">
      <div className="notify-title">
        <h1></h1>

        <h1></h1>
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
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </div>
    </div>
  );
}
