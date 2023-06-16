const fetchAirQualityAPI = require('../API/fetchAirQualityAPI');
const {
  getDynamoAirQualityData,
  storeDynamoAirQualityData
} = require('../db/dynamoAirQualityData');
const { StatusCodes } = require('http-status-codes');

// lazy loading
const getAirQuality = async (req, res) => {
  let { city, state } = req.query;
  // validators
  if (!city || !state) {
    city = 'San Diego';
    state = 'California';
  }
  let airQualityData = await getDynamoAirQualityData(city);
  if (airQualityData) {
    console.log('data in db');
    return res.status(StatusCodes.OK).json(airQualityData);
  } else {
    console.log('fetching data...');
    airQualityData = await fetchAirQualityAPI(`${city}, ${state}`);
    console.log('storing data...');
    await storeDynamoAirQualityData(airQualityData, city);
    airQualityData = await getDynamoAirQualityData(city);
  }
  console.log('returning fetched data');
  res.status(StatusCodes.OK).json(airQualityData);
};

module.exports = { getAirQuality };
