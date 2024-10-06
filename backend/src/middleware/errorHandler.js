// middleware/errorHandler.js
const logger = require('../utils/logger');

module.exports = (err, req, res, next) => {
  logger.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong';

  res.status(statusCode).json({ 
    success: false,
    message: message,
    error: process.env.NODE_ENV === 'production' ? {} : err // Hide error details in production
  });
};
