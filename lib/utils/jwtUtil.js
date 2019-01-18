const jsonWebToken = require('jsonwebtoken');
require('dotenv').config();

/**
 * @description The class handles JWT generation and verification
 */
class JwtUtil {
  /**
   * @param {string} duration
   * @param {string} payLoad
   * @returns {string} A token generated from the payload
   */
  static generateToken(duration, payLoad) {
    const token = jsonWebToken.sign(
      {
        payLoad
      },
      process.env.SECRET_KEY,
      { expiresIn: duration }
    );

    return token;
  }

  /**
   * @param {string} userToken
   * @returns {Object} userId after decoding the token or error message
   */
  static verifyToken(userToken) {
    try {
      const decodedToken = jsonWebToken.verify(userToken, process.env.SECRET_KEY);
      return decodedToken;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = JwtUtil;
