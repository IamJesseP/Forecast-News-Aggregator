const axios = require("axios");

const url = `https://newsapi.org/v2/top-headlines?country=us&q=${city} weather&apiKey=${NEWS_API_KEY}&`;

async function fetchNewsAPI(url) {
  try {
    const response = await axios.get(url);
    // const geocode = await getGeocode(location);
    // const response = await axios.get(
    //   `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${geocode.latitude}&longitude=${geocode.longitude}&hourly=pm10,pm2_5,us_aqi&timezone=auto`
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = fetchNewsAPI;
