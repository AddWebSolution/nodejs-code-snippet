// config/config.js

module.exports = {
  mongoURI: 'mongodb://localhost:27017/NodeDB',
  jwtSecret: process.env.JWT_SECRET || 'default-secret'
};
