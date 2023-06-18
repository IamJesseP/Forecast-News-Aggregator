const { generateWeatherText } = require('../API/openaiAPI');
const { StatusCodes } = require('http-status-codes');

const getWeatherAI = async (req, res) => {
  let { city, state } = req.query;
  // validator
  if (!city || !state) {
    city = 'San Diego';
    state = 'California';
  }
  try {
    const response = await generateWeatherText(city, state);
    console.log('ai response sent');
    return res.status(StatusCodes.OK).json({ message: response });
  } catch (error) {
    console.error(`An error occurred while generating weather text for ${city}, ${state}:`, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'An error occurred while generating weather text.' });
  }
};

module.exports = { getWeatherAI };
