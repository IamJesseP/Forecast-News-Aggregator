require('dotenv').config();
const openai = require('openai');
const { getWeather } = require('../controllers/weatherController');
const { weatherChecker } = require('../utils/weatherChecker');

openai.apiKey = process.env.OPENAI_API_KEY;

async function generateWeatherText(city, state) {
  let weatherData;
  try {
    weatherData = await getWeather(city, state);
  } catch (error) {
    console.log(`An error occurred while fetching weather data for ${city}, ${state}:`, error);
  }
  if (!weatherData) {
    weatherData = 'No weather data available.';
  }

  // Check if weather is cloudy, rainy, or snowy
  const [isCloudy, isRainy, isSnowy] = weatherChecker(weatherData);

  let maxTemp = weatherData.daily.temperature_2m_max[0];
  let lowTemp = weatherData.daily.temperature_2m_min[0];
  const tempAvg = Math.floor((lowTemp + maxTemp) / 2);

  let condition = '';
  if (isCloudy) condition += 'cloudy';
  if (isRainy) condition += ' and rainy';
  if (isSnowy) condition += ' and snowy';

  try {
    const result = await openai.Completion.create({
      engine: 'text-davinci-002',
      prompt: `In a maximum of 2-3 sentences, tell me how the weather in ${city}, ${state} is for the day with the given data: it's ${condition} with an average temperature of ${tempAvg}`,
      max_tokens: 100
    });

    return result.choices[0].text.trim();
  } catch (error) {
    console.error(error);
  }
}

module.exports = generateWeatherText;
