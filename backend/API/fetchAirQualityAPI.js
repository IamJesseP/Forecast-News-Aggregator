const axios = require('axios');
const { getGeocode } = require('../utils/getGeocode');

async function fetchAirQualityAPI(location) {
  try {
    const geocode = await getGeocode(location);
    const response = await axios.get(
      `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${geocode.latitude}&longitude=${geocode.longitude}&hourly=pm10,pm2_5,us_aqi&timezone=auto`
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = fetchAirQualityAPI;
