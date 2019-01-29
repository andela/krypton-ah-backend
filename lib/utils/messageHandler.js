const {
  OK_CODE,
  NOT_FOUND_CODE,
  UNSUCCESSFUL,
  SUCCESSFUL,
  SERVER_ERROR_CODE,
  SERVER_ERROR_MESSAGE,
  NUMBER_OF_REACTIONS
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
  },
  formatReaction = (reaction, reactionText) => [reactionText.slice(0, 22), reaction, reactionText.slice(22)].join(''),
  formatMessage = reaction => [NUMBER_OF_REACTIONS.slice(0, 16), reaction, NUMBER_OF_REACTIONS.slice(16)].join('');
module.exports = {
  successResponse,
  failureResponse,
  serverFailure,
  formatReaction,
  formatMessage
};
