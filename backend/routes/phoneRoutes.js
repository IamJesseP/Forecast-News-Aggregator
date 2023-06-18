const { savePhoneNumber, deletePhone } = require('../controllers/twilioController');
const express = require('express');
const router = express.Router();

router.post('/savephone', savePhoneNumber);
router.delete('/deletephone', deletePhone);

module.exports = router;
