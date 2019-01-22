const {
  OK_CODE, NOT_FOUND_CODE, UNSUCCESSFUL, SUCCESSFUL
} = require('../../constants/');

const successResponse = (res, message, statusCode = OK_CODE, data) => res.status(statusCode).json({
  success: SUCCESSFUL,
  message,
  data
});

const failureResponse = (res, message, statusCode = NOT_FOUND_CODE) => res.status(statusCode).json({
  success: UNSUCCESSFUL,
  message
});

module.exports = { successResponse, failureResponse };
