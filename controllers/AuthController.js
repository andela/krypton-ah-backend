const bcrypt = require('bcrypt');
const userModelManager = require('../lib/modelManagers/usermodel');
const jwtUtil = require('../lib/utils/jwtUtil');
const checkVerificationStatus = require('../lib/utils/verifiedUserUtil');

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
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 8);
      const userRecord = await userModelManager.create(
        req.body.email,
        hashedPassword,
        req.body.firstname,
        req.body.lastname
      );

      const { id } = userRecord.dataValues;

      req.jwtToken = jwtUtil.generateToken('1d', id);
      req.email = req.body.email;
      next();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Login a registered user.
   * @param {object} req - The request sent by user.
   * @param {object} res - The response sent to user.
   * @returns {object} The status of response and body of the response.
   */
  static async signIn(req, res) {
    try {
      const userRecord = await userModelManager.findUser(req.body.email);
      if (userRecord) {
        const { id, password, isverified } = userRecord.dataValues;

        const decryptedPassword = bcrypt.compareSync(req.body.password, password);
        if (decryptedPassword) {
          verificationStatus = checkVerificationStatus(isverified);

          if (verificationStatus) {
            const token = jwtUtil.generateToken('1d', id);
            return res.status(200).json({
              success: 'true',
              message: 'Login Successful',
              loginToken: token
            });
          }

          if (!verificationStatus) {
            return res.status(400).json({
              success: false,
              message: 'Please verify account before login'
            });
          }
        } else {
          return res.status(400).json({
            success: false,
            message: 'Incorrect Credentials'
          });
        }
      }
      return res.status(404).json({
        success: false,
        message: 'Email does not match our record'
      });
    } catch (error) {
      throw error;
    }
  }
}
module.exports = AuthController;
