// Express
const express = require('express');
const path = require('path');
const app = express();
//Security
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const expresLimiter = require('express-rate-limit');

var corsOptions = {
  origin: 'https://weather-app-six-phi-69.vercel.app', //  frontend domain
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(xss());
app.use(expresLimiter);

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
