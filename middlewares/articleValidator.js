const {
    validateUrl,
    validateArticleTitle,
    validateArticleContent,
    validateArticleDescription,
    validateIsPublished
  } = require('../lib/utils/validate'),
  { BAD_REQUEST_CODE } = require('../constants'),
  formatErrorMessage = require('../lib/utils/messageFormatter'),
  { failureResponse } = require('../lib/utils/messageHandler');

const articleValidator = async (req, res, next) => {
  try {
    await validateArticleTitle(req);
    await validateArticleDescription(req);
    await validateUrl(req, 'featuredImageUrl');
    await validateArticleContent(req);
    await validateIsPublished(req);
    await req.asyncValidationErrors();
    next();
  } catch (error) {
    const errorMessages = error.map(err => err.msg);
    return failureResponse(res, formatErrorMessage(errorMessages), BAD_REQUEST_CODE);
  }
};

module.exports = articleValidator;
