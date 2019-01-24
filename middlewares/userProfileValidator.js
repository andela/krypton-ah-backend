const {
    validateUrl,
    validateGender,
    validatePhoneNumber,
    validateUsername,
    validateEmailNotification
  } = require('../lib/utils/validate'),
  { BAD_REQUEST_CODE } = require('../constants'),
  formatErrorMessage = require('../lib/utils/messageFormatter'),
  { failureResponse } = require('../lib/utils/messageHandler');

const userProfileValidator = (req, res, next) => {
  validateUrl(req, 'avatar');
  validateGender(req);
  validatePhoneNumber(req);
  validateUsername(req);
  validateEmailNotification(req);

  const errors = req.validationErrors();

  if (errors) {
    const errorMessages = errors.map(err => err.msg);
    return failureResponse(res, formatErrorMessage(errorMessages), BAD_REQUEST_CODE);
  }
  next();
};

module.exports = userProfileValidator;
