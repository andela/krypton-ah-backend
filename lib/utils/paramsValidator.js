const { validateParams } = require('./validate'),
  { failureResponse } = require('../utils/messageHandler'),
  { BAD_REQUEST_CODE } = require('../../constants/index');

const paramsValidator = (req, res, next) => {
  validateParams(req, 'mainCommentId');

  const errors = req.validationErrors();

  if (errors) {
    const errorMessages = errors.map(err => err.msg);
    return failureResponse(res, errorMessages[0], BAD_REQUEST_CODE);
  }
  next();
};
module.exports = paramsValidator;
