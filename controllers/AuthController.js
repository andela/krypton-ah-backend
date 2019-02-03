const bcrypt = require('bcrypt'),
  userModelManager = require('../lib/modelManagers/usermodel'),
  jwtUtil = require('../lib/utils/jwtUtil'),
  checkVerificationStatus = require('../lib/utils/verifiedUserUtil'),
  {
    BAD_REQUEST_CODE,
    OK_CODE,
    NOT_FOUND_CODE,
    UNSUCCESSFUL,
    SUCCESS_LOGIN,
    TOKEN_TIMESPAN
  } = require('../constants/index');

let verificationStatus;
/** Class to add new user and login registered user. */
class AuthController {
  /**
   * Create a User.
   * @param {object} req - The request sent by user.
   * @param {object} res - The request sent by user.
   * @param {function} next - The next function to send email to user.
   * @returns {object} The status of response and body of the response.
   */
  static async signUp(req, res, next) {
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    const userRecord = await userModelManager.create(
      req.body.email,
      hashedPassword,
      req.body.firstname,
      req.body.lastname,
      req.body.callbackUrl
    );

    const { id } = userRecord.dataValues;

    req.jwtToken = jwtUtil.generateToken(TOKEN_TIMESPAN, id);
    req.email = req.body.email;
    req.callbackUrl = req.body.callbackUrl;
    return next();
  }

  /**
   * Login a registered user.
   * @param {object} req - The request sent by user.
   * @param {object} res - The response sent to user.
   * @returns {object} The status of response and body of the response.
   */
  static async signIn(req, res) {
    const userRecord = await userModelManager.findUser('email', req.body.email);
    if (userRecord) {
      const { id, password, isverified } = userRecord.dataValues;
      const userRole = await userRecord.getRoles();
      const roles = userRole.map(role => role.dataValues.role);
      const decryptedPassword = bcrypt.compareSync(req.body.password, password);
      if (decryptedPassword) {
        verificationStatus = checkVerificationStatus(isverified);
        if (verificationStatus) {
          const token = jwtUtil.generateToken(TOKEN_TIMESPAN, { id, role: roles });
          return res.status(OK_CODE).json({
            success: true,
            message: SUCCESS_LOGIN,
            loginToken: token
          });
        }
        if (!verificationStatus) {
          return res.status(BAD_REQUEST_CODE).json({
            success: UNSUCCESSFUL,
            message: 'Please verify account before login'
          });
        }
      } else {
        return res.status(BAD_REQUEST_CODE).json({
          success: UNSUCCESSFUL,
          message: 'Incorrect Credentials'
        });
      }
    }
    return res.status(NOT_FOUND_CODE).json({
      success: UNSUCCESSFUL,
      message: 'Email does not match our record'
    });
  }
}
module.exports = AuthController;
