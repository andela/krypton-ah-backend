const { OK_CODE, NOT_FOUND_CODE } = require('../../constants/');

const defaultResponse = (res, message, statusCode = OK_CODE) => res.status(statusCode).json({
  success: true,
  message,
});
const successResponse = (res, message, data, statusCode = OK_CODE) => res.status(statusCode).json({
  success: true,
  message,
  data
});


const failureResponse = (res, message, statusCode = NOT_FOUND_CODE) => res.status(statusCode).json({
  success: false,
  message
});

module.exports = { defaultResponse, successResponse, failureResponse };
