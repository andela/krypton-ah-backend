const jwtUtil = require('../lib/utils/jwtUtil'),
  { getTokenFromReq } = require('../lib/utils/helpers');

/**
 * Token validator middleware.
 * @param {object} req - The request sent by user.
 * @param {object} res - The response sent to user.
 * @param {function} next - Next function to be called.
 * @returns {object} The status of response and body of the response.
 */
const partialJwtValidator = (req, res, next) => {
  const token = getTokenFromReq(req);
  if (token) {
    try {
      req.decodedToken = jwtUtil.verifyToken(token);
    } catch (err) {
      return next();
    }
  }
  return next();
};
module.exports = partialJwtValidator;
