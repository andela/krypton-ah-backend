const User = require('../lib/modelManagers/usermodel'),
  { generateToken } = require('../lib/utils/jwtUtil'),
  {
    OK_CODE,
    RESOURCE_CREATED_CODE,
    BAD_REQUEST_CODE,
    INVALID_USER,
    TOKEN_TIMESPAN,
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
    const { id, created } = req.user.user;
    const token = await generateToken(TOKEN_TIMESPAN, { id });
    const userDetails = Object.assign({}, req.user, {
      msg: created ? WELCOME_NEW_USER : WELCOME_EXISTING_USER,
      token
    });
    const status = created ? RESOURCE_CREATED_CODE : OK_CODE;
    res.status(status).send(userDetails);
  }

  /**
   * @static
   * @param {object} req - HTTP request object
   * @param {object} res - HTTP response object
   * @returns {object} - returns generated token to the redirected url
   */
  static async getUserTokenTwitter(req, res) {
    if (!req.user) {
      return res.status(BAD_REQUEST_CODE).send(INVALID_USER);
    }
    const { id, created } = req.user.user;
    const token = await generateToken(TOKEN_TIMESPAN, { id });
    Object.assign({}, req.user, {
      msg: created ? WELCOME_NEW_USER : WELCOME_EXISTING_USER,
      token
    });
    const status = created ? RESOURCE_CREATED_CODE : OK_CODE;
    res.status(status).redirect(`${process.env.FRONT_URL_TWITTER}=${token}`);
  }
}

module.exports = SocialMediaController;
