require('dotenv').config();
const fetchWeatherAPI = require('../API/fetchWeatherAPI');
const { Configuration, OpenAIApi } = require('openai');
const { weatherChecker } = require('../utils/weatherChecker');
const { getDynamoWeatherData, storeDynamoWeatherData } = require('../db/dynamoWeatherData');

const configuration = new Configuration({
  apiKey: process.env.OPEN_API_KEY
});
const openai = new OpenAIApi(configuration);

async function generateWeatherText(city, state) {
  console.log(city);
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

  // Check if weather is cloudy, rainy, or snowy
  const [isCloudy, isRainy, isSnowy] = weatherChecker(weatherData);

  let maxTemp = weatherData.weatherData.daily.temperature_2m_max[0];
  let lowTemp = weatherData.weatherData.daily.temperature_2m_min[0];
  const tempAvg = Math.floor((lowTemp + maxTemp) / 2);

  let condition = '';
  if (isCloudy) condition += 'cloudy';
  if (isRainy) condition += ' and rainy';
  if (isSnowy) condition += ' and snowy';

  try {
    const result = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `In a maximum of 2-3 sentences, tell me how the weather in ${city}, ${state} is for the day with the given data: it's ${condition} with an average temperature of ${tempAvg}. Give a new short fun fact about ${city}`,
      max_tokens: 100
    });
    return result.data.choices[0].text;
  } catch (error) {
    console.error(error);
  }
}

module.exports.generateWeatherText = generateWeatherText;
