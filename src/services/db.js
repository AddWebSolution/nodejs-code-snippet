// src/services/db.js

const mongoose = require('mongoose');
const config = require('../../config/config');

const connectDB = async () => {
  try {
    mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit process with failure
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = { connectDB, disconnectDB };
