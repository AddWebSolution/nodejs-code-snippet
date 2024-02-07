// app.js

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Importing routes
const routes = require('./routes');
const { sendResponse } = require('./middlewares/responseMiddleware');

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(sendResponse); // Add the response middleware

// Routes middleware
app.use('/', routes);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.sendError('Something broke!', 500);
});

app.listen(3001, () => {
  console.log("Server is up on port 3001.");
});

module.exports = app;
