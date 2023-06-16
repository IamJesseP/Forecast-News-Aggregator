const fetchWeatherAPI = require('../API/fetchWeatherAPI');
const { getDynamoWeatherData, storeDynamoWeatherData } = require('../db/dynamoWeatherData');
const { StatusCodes } = require('http-status-codes');

// lazy loading
const getWeather = async (req, res) => {
  const { city, state } = req.body;
  // validator
  let weatherData = await getDynamoWeatherData(city);
  if (weatherData) {
    console.log('data in db');
    return res.status(StatusCodes.OK).json(weatherData);
  } else {
    console.log('fetching data...');
    weatherData = await fetchWeatherAPI(`${city}, ${state}`);
    console.log('storing data...');
    await storeDynamoWeatherData(weatherData, city);
  }
  console.log('returning fetched data');
  res.status(StatusCodes.OK).json(weatherData);
};

module.exports = { getWeather };
