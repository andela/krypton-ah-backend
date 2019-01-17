const User = require('../lib/modelManagers/usermodel');
const {
  CONFLICT_CODE,
  SERVER_ERROR_CODE,
  EMAIL_ALREADY_EXIST,
  SERVER_ERROR_MESSAGE
} = require('../constants');
const { failureResponse } = require('../lib/utils/messageHandler');

/**
 * @description Check if email is already in the database
 * @param {*} req
 * @param {*} res
 * @param {*} next middleware in the stack
 * @returns {*} *
 */
async function checkEmail(req, res, next) {
  try {
    const record = await User.findUserByEmail(req.body.email);
    if (record) {
      return failureResponse(res, EMAIL_ALREADY_EXIST, CONFLICT_CODE);
    }
    return next();
  } catch (error) {
    return failureResponse(res, SERVER_ERROR_MESSAGE, SERVER_ERROR_CODE);
  }
}

module.exports = checkEmail;
