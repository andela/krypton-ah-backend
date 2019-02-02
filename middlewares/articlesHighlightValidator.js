const { validateContent, validateIndex } = require('../lib/utils/validate'),
  { failureResponse } = require('../lib/utils/messageHandler'),
  { BAD_REQUEST_CODE } = require('../constants'),
  formatErrorMessage = require('../lib/utils/messageFormatter');

const articlesHighlightValidator = (req, res, next) => {
  if (Object.keys(req.body).includes('highlightedText')) {
    validateContent(req, 'highlightedText');
    validateIndex(req, 'startIndex');
    validateIndex(req, 'endIndex');
    const errors = req.validationErrors();
    if (errors) {
      const errorMessages = errors.map(err => err.msg);
      return failureResponse(res, formatErrorMessage(errorMessages), BAD_REQUEST_CODE);
    }
  }
  next();
};

module.exports = articlesHighlightValidator;
