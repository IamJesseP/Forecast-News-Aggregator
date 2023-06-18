const { StatusCodes } = require('http-status-codes');
const cron = require('node-cron');
const twilio = require('twilio');
const {
  storePhoneNumber,
  deletePhoneNumber,
  getAllPhoneNumbers,
  getPhoneNumber
} = require('../db/dynamoPhoneData');
const { getWeather } = require('./weatherController');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const savePhoneNumber = async (req, res) => {
  const { phoneNumber, city, state } = req.body;
  if (!phoneNumber || phoneNumber.length !== 10) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Please provide a valid US phone number' });
  }
  if (!city || !state) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Please provide both city and state' });
  }

  try {
    const existingPhoneNumber = await getPhoneNumber(phoneNumber);
    if (existingPhoneNumber) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ msg: 'This phone number is already registered.' });
    }

    await storePhoneNumber(phoneNumber, city, state);
    return res.status(StatusCodes.OK).json({ msg: 'Phone number saved successfully' });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'An error occurred' });
  }
};

const deletePhone = async (req, res) => {
  const { phoneNumber } = req.body;
  if (!phoneNumber || phoneNumber.length !== 10) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Please provide a valid US phone number' });
  }
  try {
    await deletePhoneNumber(phoneNumber);
    return res.status(StatusCodes.OK).json({ msg: 'Phone number deleted successfully' });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'An error occurred' });
  }
};

const sendMessage = async (phoneNumber, city, state) => {
  let weatherData;
  try {
    weatherData = await getWeather(city, state);
  } catch (error) {
    console.log(`An error occurred while fetching weather data for ${city}, ${state}:`, error);
  }
  if (!weatherData) {
    weatherData = 'No weather data available.';
  }
  let maxTemp = weatherData.daily.temperature_2m_max[0];
  let lowTemp = weatherData.daily.temperature_2m_min[0];
  const tempAvg = Math.floor((lowTemp + maxTemp) / 2);
  client.messages
    .create({
      from: '+18885894748',
      to: `+1${phoneNumber}`,
      body: `Hello! The current weather in ${city}, ${state} is feeling around: ${tempAvg}`
    })
    .then((message) => console.log(message.sid))
    .catch((error) => console.log(error));
};

cron.schedule('0 0 * * *', async () => {
  try {
    console.log('Sending message...');
    const phoneDataList = await getAllPhoneNumbers();
    phoneDataList.forEach((phoneData) =>
      sendMessage(phoneData.phoneNumber, phoneData.city, phoneData.state)
    );
  } catch (error) {
    console.log('An error occurred while fetching phone numbers:', error);
  }
});

module.exports = { savePhoneNumber, deletePhone };
