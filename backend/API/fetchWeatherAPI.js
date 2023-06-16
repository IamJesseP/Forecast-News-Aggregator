//axios
const axios = require('axios');
const { getGeocode } = require('../utils/getGeocode');

async function fetchWeatherAPI(location) {
  try {
    const geocode = await getGeocode(location);
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${geocode.latitude}&longitude=${geocode.longitude}&hourly=temperature_2m,rain,snowfall,cloudcover_high&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&forecast_days=1&timezone=auto`
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = fetchWeatherAPI;
