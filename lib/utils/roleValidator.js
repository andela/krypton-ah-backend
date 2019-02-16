/* eslint-disable newline-per-chained-call */
const { validateName } = require('./validate'),
  { failureResponse } = require('../utils/messageHandler'),
  { BAD_REQUEST_CODE } = require('../../constants/index'),
  formatErrorMessage = require('../utils/messageFormatter');

/**
 * @description check against errors on signup fields
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {function} undefined
 */
const roleValidator = (req, res, next) => {
  validateName(req, 'role');

  const errors = req.validationErrors();

  if (errors) {
    const errorMessages = errors.map(err => err.msg);
    return failureResponse(res, formatErrorMessage(errorMessages), BAD_REQUEST_CODE);
  }
  next();
};

module.exports = roleValidator;
