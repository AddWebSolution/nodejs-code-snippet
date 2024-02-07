const { disconnectDB } = require("../services/db");

const sendResponse = (req, res, next) => {
  res.sendSuccess = async(data, message = 'Success', status = 200) => {
    res.status(status).json({
      meta: { status, message },
      data: data
    });
  };

  res.sendError = async(message = 'Internal Server Error', status = 500) => {
    res.status(status).json({
      meta: { status, message }
    });
  };

  next();
};

module.exports = { sendResponse };