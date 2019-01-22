const jwtUtil = require('../lib/utils/jwtUtil'),
  User = require('../lib/modelManagers/usermodel'),
  resetMail = require('../lib/utils/emailService/resetMail'),
  response = require('../lib/utils/responses'),
  {
    USER_EMAIL,
    OK_CODE,
    BAD_REQUEST_CODE,
    SERVER_ERROR_CODE,
    NOT_FOUND_CODE,
    EMAIL_NOT_FOUND,
    RESET_LINK_SENT,
    RESET_LINK_NOT_SENT,
    EXPIRED_RESET_LINK,
    INVALID_RESET_LINK,
    VALID_RESET_LINK
  } = require('../constants/index');

/**
 * @description Password Reset Controller Class.
 */
class PasswordReset {
/**
 * sends reset E-mail.
 * @param {object} req Request Object.
 * @param {object} res Response Object.
 * @returns {object} Response with status, success true or false, and message.
 */
  static async sendResetLink(req, res) {
    const user = await User.getUserDetails(USER_EMAIL, req.body.email);
    if (!user) {
      return response(res, NOT_FOUND_CODE, false, EMAIL_NOT_FOUND);
    }

    try {
      await resetMail(req.body.email, user.id);
      return response(res, OK_CODE, true, RESET_LINK_SENT);
    } catch (err) {
      response(res, SERVER_ERROR_CODE, false, RESET_LINK_NOT_SENT);
    }
  }

  /**
 * Checks the reset token.
 * @param {object} req Request Object.
 * @param {object} res Response Object.
 * @returns {int} Response with status, success true or false, and message.
 */
  static async checkResetLink(req, res) {
    const urlToken = req.params.token;
    try {
      const userId = await jwtUtil.verifyToken(urlToken).uuid;
      res.status(200).json({
        success: true,
        message: VALID_RESET_LINK,
        userId,
      });
      return;
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return response(res, BAD_REQUEST_CODE, false, EXPIRED_RESET_LINK);
      }

      if (err || err.name === 'JsonWebTokenError') {
        response(res, BAD_REQUEST_CODE, false, INVALID_RESET_LINK);
      }
    }
  }
}

module.exports = PasswordReset;
