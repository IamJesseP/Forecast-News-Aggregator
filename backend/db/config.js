const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
  region: process.env.AW_REGION,
  accessKeyId: process.env.AW_ACCESS_KEY_ID,
  secretAccessKey: process.env.AW_SECRET_ACCESS_KEY
});

module.exports = AWS;
