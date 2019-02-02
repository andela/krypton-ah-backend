const {
  OK_CODE,
  NOT_FOUND_CODE,
  UNSUCCESSFUL,
  SUCCESSFUL,
  SERVER_ERROR_CODE,
  SERVER_ERROR_MESSAGE
} = require('../../constants/');

const successResponse = (res, message, statusCode = OK_CODE, data) => res.status(statusCode).json({
    success: SUCCESSFUL,
    message,
    data
  }),
  failureResponse = (res, message, statusCode = NOT_FOUND_CODE) => res.status(statusCode).json({
    success: UNSUCCESSFUL,
    message
  }),
  serverFailure = (res, message = SERVER_ERROR_MESSAGE, statusCode = SERVER_ERROR_CODE) => {
    res.status(statusCode).json({
      success: UNSUCCESSFUL,
      message
    });
  };

module.exports = {
  successResponse,
  failureResponse,
  serverFailure
};
