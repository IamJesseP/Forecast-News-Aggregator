const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

module.exports = AWS;

const dynamodb = new AWS.DynamoDB.DocumentClient();
let weatherData = {
  id: 1,
  city: 'London',
  temperature: '20C',
  humidity: '80%',
  pressure: '1000hPa',
  wind_speed: '10km/h'
};
let params = {
  TableName: 'weatherData',
  Item: weatherData
};

dynamodb.put(params, (err, data) => {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('Success', data);
  }
});
