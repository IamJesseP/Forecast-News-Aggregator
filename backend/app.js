// Express
const express = require('express');
const path = require('path');

// firebase
const app = express();

app.use(express.json());

// Routers
const weatherRouter = require('./routes/weatherRoutes');

// Endpoints
app.use('/weather', weatherRouter);

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running`);
});
