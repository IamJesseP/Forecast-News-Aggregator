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

module.exports = getDynamoWeatherData;
