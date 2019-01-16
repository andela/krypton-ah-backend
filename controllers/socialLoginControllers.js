/* eslint-disable prefer-destructuring */
const generator = require('generate-password'),
  generateUserToken = require('../lib/utils/UserVerification'),
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
  static facebookCallback(accessToken, refreshToken, profile, done) {
    const {
      displayName,
      emails,
    } = profile;
    const name = displayName.split(' ');

    User.findOrCreate({
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
    }).spread((user, created) => {
      const userDetails = user.get({ plain: true });
      userDetails.newUserCreated = created;
      return done(null, profile);
    });
  }

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
  static googleCallback(accessToken, refreshToken, profile, done) {
    const {
      displayName,
      emails,
    } = profile;
    const name = displayName.split(' ');

    User.findOrCreate({
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
    }).spread((user, created) => {
      const userDetails = user.get({ plain: true });
      userDetails.newUserCreated = created;
      return done(null, profile);
    });
  }

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
  static linkedCallback(accessToken, refreshToken, profile, done) {
    const { name, emails } = profile;
    User.findOrCreate({
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
    }).spread((user, created) => {
      const userDetails = user.get({ plain: true });
      userDetails.newUserCreated = created;
      return done(null, profile);
    });
  }

  /**
   * @static
   * @param {object} req - HTTP request object
   * @param {object} res - HTTP response object
   * @returns {object} - object containing a generated token
   */
  static getUserToken(req, res) {
    const {
      id, emails, displayName, photos, provider, name, newUserCreated
    } = req.user;
    // Declaraction
    let avatar, username;
    switch (provider) {
      case 'facebook':
      case 'google':
        username = displayName.split(' ')[0];
        avatar = photos[0].value;
        break;
      case 'linkedin':
        username = name.givenName;
        avatar = (photos === []) ? '' : photos;
        break;
      default:
        break;
    }
    const email = emails[0].value;
    const payload = { id, email };
    const time = {};
    time.expiresIn = '360h';
    const token = generateUserToken(payload, time);

    if (newUserCreated) {
      return res.status(201).json({
        message: 'Signed up successfully',
        token
      });
    }
    return res.status(200).json({
      message: `Welcome back ${username}`,
      avatar,
      token
    });
  }
}

module.exports = SocialMediaController;
