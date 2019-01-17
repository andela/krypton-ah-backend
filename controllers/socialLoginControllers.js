const generateUserToken = require('../lib/utils/generateToken'),
  User = require('../lib/modelManagers/usermodel'),
  {
    OK_CODE,
    CREATED_CODE,
    BAD_REQUEST_CODE,
    INVALID_USER,
    WELCOME_EXISTING_USER,
    WELCOME_NEW_USER
  } = require('../constants/index');

/**
 * @description Social Media Authentication
 * @class SocialMediaController
 */
class SocialMediaController {
  /**
   * @static
   *
   * @param {object} accessToken
   * @param {object} refreshToken
   * @param {object} profile - contains profile details gotten from facebook
   * @param {*} done - callback which return the user object
   *
   * @returns {*} - passes execution to next middleware on route path
   *
   * @memberof SocialMediaController
   */
  static async socailLoginsCallback(accessToken, refreshToken, profile, done) {
    const {
      displayName,
      emails,
    } = profile;
    const name = displayName.split(' ');

    const query = await User.findOrCreateUser(emails, name);
    done(null, { user: query[0].dataValues, created: query[1] });
  }

  /**
   * @static
   * @param {object} req - HTTP request object
   * @param {object} res - HTTP response object
   * @returns {object} - object containing a generated token
   */
  static async getUserToken(req, res) {
    if (!req.user) {
      return res.status(BAD_REQUEST_CODE).send(INVALID_USER);
    }
    const { id, email, created } = req.user;
    const time = {
      expiresIn: '24h'
    };
    const token = await generateUserToken({ id, email }, time);
    const userDetails = Object.assign({}, req.user, {
      msg: created ? WELCOME_NEW_USER : WELCOME_EXISTING_USER,
      token
    });
    const status = created ? CREATED_CODE : OK_CODE;
    res.status(status).send(userDetails);
  }
}

module.exports = SocialMediaController;
