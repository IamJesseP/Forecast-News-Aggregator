const { getNews } = require('../controllers/newsController');
const express = require('express');
const router = express.Router();

router.get('/', getNews);

module.exports = router;
