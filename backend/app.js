// Express
const express = require('express');
const path = require('path');
const app = express();
const AWS = require('./db/config');
//Security
const cors = require('cors');
const xss = require('xss');
const rateLimit = require('express-rate-limit');

// Security Usage
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(xss());
app.use(
  cors({
    origin: 'https://weather-app-six-phi-69.vercel.app'
  })
);
app.use(limiter);

app.use(express.json());

// Routers
const weatherRouter = require('./routes/weatherRoutes');
const airQualtiyRouter = require('./routes/airQualityRoutes');
const newsRouter = require('./routes/newsRoutes');
const phoneRouter = require('./routes/phoneRoutes');
const openaiRouter = require('./routes/openaiRoutes');

// Endpoints
app.use('/weather', weatherRouter);
app.use('/airquality', airQualtiyRouter);
app.use('/news', newsRouter);
app.use('/phone', phoneRouter);
app.use('/openai', openaiRouter);

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running`);
});
