/* eslint-disable prefer-destructuring */
const generator = require('generate-password'),
  generateUserToken = require('../lib/utils/generateToken'),
  model = require('../database/models');

const { User } = model;

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
    await User.findOrCreate({
      where: {
        $or: [{ email: emails[0].value }]
      },
      defaults: {
        email: emails[0].value,
        password: generator.generate({
          length: 15,
          uppercase: true,
          numbers: true,
          symbols: true,
          exclude: [''],
          excludeSimilarCharacters: true
        }),
        firstname: name[0],
        lastname: name[1],
        isverified: true
      }
    }).spread((user, created) => (
      done(null, { ...user.dataValues, created })
    ));
  }

  /**
   * @static
   *
   * @param {object} accessToken
   * @param {object} refreshToken
   * @param {object} profile - contains profile details gotten from linkedin
   * @param {*} done - callback which return the user object
   *
   * @returns {*} - passes execution to next middleware on route path
   *
   * @memberof SocialMediaController
   */
  static async linkedInCallback(accessToken, refreshToken, profile, done) {
    const { name, emails } = profile;
    await User.findOrCreate({
      where: {
        $or: [{ email: emails[0].value }]
      },
      defaults: {
        email: emails[0].value,
        password: generator.generate({
          length: 15,
          uppercase: true,
          numbers: true,
          symbols: true,
          exclude: [''],
          excludeSimilarCharacters: true
        }),
        firstname: name.givenName,
        lastname: name.familyName,
        isverified: true
      }
    }).spread((user, created) => (
      done(null, { ...user.dataValues, created })
    ));
  }

  /**
   * @static
   * @param {object} req - HTTP request object
   * @param {object} res - HTTP response object
   * @returns {object} - object containing a generated token
   */
  static async getUserToken(req, res) {
    const { id, email, created } = req.user;
    const time = {
      expiresIn: '24h'
    };
    const token = await generateUserToken({ id, email }, time);
    const userDetails = Object.assign({}, req.user, {
      msg: created ? 'Welcome!' : 'Welcome back',
      token
    });
    const status = created ? 201 : 200;
    res.status(status).send(userDetails);
  }
}

module.exports = SocialMediaController;
