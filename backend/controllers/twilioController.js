const { StatusCodes } = require('http-status-codes');
const twilio = require('twilio');
const { storePhoneNumber, deletePhoneNumber, getPhoneNumber } = require('../db/dynamoPhoneData');
const fetchWeatherAPI = require('../API/fetchWeatherAPI');
const { getDynamoWeatherData, storeDynamoWeatherData } = require('../db/dynamoWeatherData');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

let tempAvg;

const savePhoneNumber = async (req, res) => {
  const { phoneNumber, city, state } = req.body;
  // Validators
  if (!phoneNumber || phoneNumber.length !== 10) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Please provide a valid US phone number in the format "6191234567"' });
  }
  if (!city || !state) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Please provide both city and state' });
  }
  // DynamoDB save, send signup msg
  try {
    const existingPhoneNumber = await getPhoneNumber(phoneNumber);
    if (existingPhoneNumber) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ msg: 'This phone number is already registered.' });
    }
    await storePhoneNumber(phoneNumber, city, state);
    await sendSignUpMessage(phoneNumber, city, state);
    return res.status(StatusCodes.OK).json({ msg: 'Phone number saved successfully' });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'An error occurred' });
  }
};

const deletePhone = async (req, res) => {
  const { phoneNumber } = req.body;
  // Validators
  if (!phoneNumber || phoneNumber.length !== 10) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Please provide a valid US phone number' });
  }
  // Delete
  try {
    await deletePhoneNumber(phoneNumber);
    return res.status(StatusCodes.OK).json({ msg: 'Phone number deleted successfully' });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'An error occurred' });
  }
};

const sendSignUpMessage = async (phoneNumber, city, state) => {
  // Used on savePhoneNumber
  client.messages
    .create({
      from: '+18885894748',
      to: `+1${phoneNumber}`,
      body: `Hello! You're signed up for daily weather notifications! You'll receive a notification every morning with the weather for ${city}, ${state}. Unsubscribe available on our app!`
    })
    .then((message) => console.log(message.sid))
    .catch((error) => console.log(error));
};

const sendMessage = async (phoneNumber, city, state) => {
  let weatherData = await getDynamoWeatherData(city);
  if (weatherData) {
    console.log('data in db');
  } else {
    console.log('fetching data...');
    weatherData = await fetchWeatherAPI(`${city}, ${state}`);
    console.log('storing data...');
    await storeDynamoWeatherData(weatherData, city);
    weatherData = await getDynamoWeatherData(city);
  }
  let maxTemp = weatherData.daily.temperature_2m_max[0];
  let lowTemp = weatherData.daily.temperature_2m_min[0];
  tempAvg = Math.floor((lowTemp + maxTemp) / 2);
  client.messages
    .create({
      from: '+18885894748',
      to: `+1${phoneNumber}`,
      body: `Hello! The current weather in ${city}, ${state} is feeling around: ${tempAvg}`
    })
    .then((message) => console.log(message.sid))
    .catch((error) => console.log(error));
};

module.exports = { savePhoneNumber, deletePhone, sendMessage };
