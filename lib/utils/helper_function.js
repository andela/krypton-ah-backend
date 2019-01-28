const { OK_CODE, NOT_FOUND_CODE } = require('../../constants/');

const successResponse = (res, message, data, statusCode = OK_CODE) => res.status(statusCode).json({
  success: true,
  message,
  data
});


const failureResponse = (res, message, code = NOT_FOUND_CODE, data) => res.status(code).json({
  success: false,
  message,
  data
});

module.exports = { successResponse, failureResponse };
