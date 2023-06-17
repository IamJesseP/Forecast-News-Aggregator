const fetchNewsAPI = require('../API/fetchNewsAPI');
const { getDynamoNewsData, storeDynamoNewsData } = require('../db/dynamoNewsData');
const { StatusCodes } = require('http-status-codes');

// lazy loading
const getNews = async (req, res) => {
  let { city, state } = req.query;
  // validator
  if (!city || !state) {
    city = 'San Diego';
    state = 'California';
  }
  let newsData = await getDynamoNewsData(city);
  if (newsData) {
    console.log('data in db');
    return res.status(StatusCodes.OK).json(newsData);
  } else {
    console.log('fetching data...');
    newsData = await fetchNewsAPI(`${city}`);
    console.log('storing data...');
    await storeDynamoNewsData(newsData, city);
    newsData = await getDynamoNewsData(city);
  }
  console.log('returning fetched data');
  res.status(StatusCodes.OK).json(newsData);
};

module.exports = { getNews };
