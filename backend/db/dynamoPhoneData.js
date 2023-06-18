const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

async function storePhoneNumber(phoneNumber, city, state) {
  const params = {
    TableName: 'phoneTable',
    Item: {
      phoneNumber: phoneNumber,
      city: city,
      state: state
    }
  };

  try {
    await dynamoDb.put(params).promise();
    console.log('Data stored successfully');
  } catch (error) {
    console.log('Error: ', error);
    throw error;
  }
}

async function deletePhoneNumber(phoneNumber) {
  const params = {
    TableName: 'phoneTable',
    Key: {
      phoneNumber: phoneNumber
    }
  };

  try {
    await dynamoDb.delete(params).promise();
    console.log('Phone number deleted successfully');
  } catch (error) {
    console.log('Error: ', error);
    throw error;
  }
}

async function getAllPhoneNumbers() {
  const params = {
    TableName: 'phoneTable'
  };

  try {
    const data = await dynamoDb.scan(params).promise();
    return data.Items;
  } catch (error) {
    console.log('Error: ', error);
    throw error;
  }
}

module.exports = { storePhoneNumber, deletePhoneNumber, getAllPhoneNumbers };
