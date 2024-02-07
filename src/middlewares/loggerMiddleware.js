// loggerMiddleware.js

const { connectDB } = require("../services/db");

// Example custom middleware for logging
module.exports = async (req, res, next) => {
  console.log('Time:', Date.now());
  await connectDB();
  next();
};
