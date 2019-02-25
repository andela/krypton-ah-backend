const formatErrorMessage = require('../lib/utils/messageFormatter'),
  { BAD_REQUEST_CODE } = require('../constants/index'),
  { failureResponse } = require('../lib/utils/messageHandler'),
  { validateEmail } = require('../lib/utils/validate');

/**
 * Rating validator middleware.
 * @param {object} req - The request sent by user.
 * @param {object} res - The response sent to user.
 * @param {function} next - Next middleware to be called.
 * @returns {object} The status of response and body of the response.
 */
const emailValidator = (req, res, next) => {
  validateEmail(req);

  const errors = req.validationErrors();

  if (errors) {
    const errorMessages = errors.map(err => err.msg);
    return failureResponse(res, formatErrorMessage(errorMessages), BAD_REQUEST_CODE);
  }
  next();
};

module.exports = emailValidator;
