const AWS = require('./config');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

async function storeDynamoWeatherData(weatherData, city) {
  const params = {
    TableName: 'weatherData',
    Item: { weatherData, city: city }
  };

  try {
    await dynamoDb.put(params).promise();
    console.log('Data stored successfuly');
  } catch (error) {
    console.log('Error: ', error);
    throw error;
  }
}

module.exports = storeDynamoWeatherData;
