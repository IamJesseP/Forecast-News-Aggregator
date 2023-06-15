const { getWeather } = require('../controllers/weatherController');
const express = require('express');
const router = express.Router();

router.get('/', getWeather);

module.exports = router;
