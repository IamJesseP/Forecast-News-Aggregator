// Express
const express = require("express");
const path = require("path");

// firebase
const app = express();


app.use(express.json());

// Routers
const taskRouter = require("./routes/taskRoutes");

// Endpoints
app.get('/', (req, res) => {
    res.send('Hello, world!');
  });

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running`);
});

