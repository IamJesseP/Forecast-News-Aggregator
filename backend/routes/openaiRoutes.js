const { getWeatherAI } = require('../controllers/openaiController');
const express = require('express');
const router = express.Router();

router.get('/', getWeatherAI);

module.exports = router;
