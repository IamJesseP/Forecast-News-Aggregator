const axios = require("axios");
require("dotenv").config();

async function fetchNewsAPI(city) {
  try {
    const url = `https://newsapi.org/v2/everything?q=${city}&apiKey=${process.env.NEWS_API_KEY}`;
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = fetchNewsAPI;
