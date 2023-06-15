const { getAirQuality } = require('../controllers/airQualityController');
const express = require('express');
const router = express.Router();

router.get('/', getAirQuality);

module.exports = router;
