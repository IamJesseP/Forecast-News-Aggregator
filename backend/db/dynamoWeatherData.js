const AWS = require('./config');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

async function getDynamoWeatherData(city) {
  const params = {
    TableName: 'weatherData',
    Key: {
      city: city
    }
  };
  try {
    const data = await dynamoDb.get(params).promise();
    return data.Item;
  } catch (error) {
    console.log('Error: ', error);
    throw error;
  }
}

async function storeDynamoWeatherData(weatherData, city) {
  const params = {
    TableName: 'weatherData',
    Item: { weatherData, city: city, ttl: Math.floor(Date.now() / 1000) + 3600 }
  };

  try {
    await dynamoDb.put(params).promise();
    console.log('Data stored successfuly');
  } catch (error) {
    console.log('Error: ', error);
    throw error;
  }
}

module.exports = { getDynamoWeatherData, storeDynamoWeatherData };
