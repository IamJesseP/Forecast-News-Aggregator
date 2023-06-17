const AWS = require('./config');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

async function getDynamoNewsData(city) {
  const params = {
    TableName: 'newsTable',
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

async function storeDynamoNewsData(newsData, city) {
  const params = {
    TableName: 'newsTable',
    Item: { newsData, city: city, ttl: Math.floor(Date.now() / 1000) + 3600 }
  };

  try {
    await dynamoDb.put(params).promise();
    console.log('Data stored successfuly');
  } catch (error) {
    console.log('Error: ', error);
    throw error;
  }
}

module.exports = { getDynamoNewsData, storeDynamoNewsData };
