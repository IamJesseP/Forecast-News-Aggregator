const { sendMessage } = require('../controllers/twilioController');
const { getAllPhoneNumbers } = require('../db/dynamoPhoneData');
const cron = require('node-cron');

cron.schedule('0 9 * * *', async () => {
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
