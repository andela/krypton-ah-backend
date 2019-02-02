const { validateUUID } = require('../lib/utils/validate'),
  { BAD_REQUEST_CODE } = require('../constants'),
  formatErrorMessage = require('../lib/utils/messageFormatter'),
  { failureResponse } = require('../lib/utils/messageHandler');

const getArticleValidator = (req, res, next) => {
  validateUUID(req, 'id');
  const errors = req.validationErrors();
  if (errors) {
    const errorMessages = errors.map(err => err.msg);
    return failureResponse(res, formatErrorMessage(errorMessages), BAD_REQUEST_CODE);
  }
  next();
};

module.exports = getArticleValidator;
