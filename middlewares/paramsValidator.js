const { validateParams } = require('../lib/utils/validate'),
  { failureResponse } = require('../lib/utils/messageHandler'),
  { BAD_REQUEST_CODE } = require('../constants/index');

const paramsValidator = (req, res, next) => {
  Object.keys(req.params).forEach((param) => {
    validateParams(req, param);
  });
  const errors = req.validationErrors();

  if (errors) {
    const errorMessages = errors.map(err => err.msg);
    return failureResponse(res, errorMessages[0], BAD_REQUEST_CODE);
  }

  next();
};
module.exports = paramsValidator;
