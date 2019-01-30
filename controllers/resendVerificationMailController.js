const jwtUtil = require('../lib/utils//jwtUtil');
const UserModelManager = require('../lib/modelManagers/usermodel');
const { failureResponse } = require('../lib/utils/helper_function'),
  { serverFailure } = require('../lib/utils/messageHandler'),
  {
    NOT_FOUND_CODE,
    BAD_REQUEST_CODE,
    USER_NOT_FOUND_MESSAGE,
    ALREADY_ACTIVATED_ERROR,
    TOKEN_TIMESPAN
  } = require('../constants');

/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {object} response object with appropriate http code after checking the user's email.
 */
const resendMail = async (req, res, next) => {
  const { email } = req.body;
  try {
    const foundUser = await UserModelManager.findUser('email', email);
    if (foundUser === null) {
      return failureResponse(res, USER_NOT_FOUND_MESSAGE, NOT_FOUND_CODE);
    }
    if (foundUser.isverified === true) {
      return failureResponse(res, ALREADY_ACTIVATED_ERROR, BAD_REQUEST_CODE);
    }
    const payLoad = foundUser.id;
    req.jwtToken = await jwtUtil.generateToken(TOKEN_TIMESPAN, payLoad);
    req.email = email;
    req.resend = true;
    return next();
  } catch (error) {
    return serverFailure(res);
  }
};
module.exports = resendMail;
