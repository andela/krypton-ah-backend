const response = require('../lib/utils/responses'),
  { BAD_REQUEST_CODE } = require('../constants/index'),
  { validateUUID, validateRating } = require('../lib/utils/validate');

/**
 * @descriptionRating validator middleware.
 * @param {object} req - The request sent by user.
 * @param {object} res - The response sent to user.
 * @param {function} next - Next middleware to be called.
 * @returns {object} The status of response and body of the response.
 */
const ratingValidator = (req, res, next) => {
  validateUUID(req, 'reviewerId');
  validateUUID(req, 'articleId');
  validateRating(req);

  const errors = req.validationErrors();

  if (errors) {
    const errorMessages = errors.map(err => err.msg);
    return response(res, BAD_REQUEST_CODE, false, errorMessages);
  }
  next();
};

module.exports = ratingValidator;
