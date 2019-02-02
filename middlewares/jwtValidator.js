const jwtUtil = require('../lib/utils/jwtUtil'),
  {
    BAD_REQUEST_CODE,
    JWT_EXPIRED,
    JWT_MALFORMED,
    UNAUTHORIZED_CODE,
    UNAUTHORIZED_REQUEST
  } = require('../constants/index');
const { failureResponse } = require('../lib/utils/messageHandler');
const { getTokenFromReq } = require('../lib/utils/helpers');
/**
 * Token validator middleware.
 * @param {object} req - The request sent by user.
 * @param {object} res - The response sent to user.
 * @param {function} next - Next function to be called.
 * @returns {object} The status of response and body of the response.
 */
const jwtValidator = (req, res, next) => {
  const token = getTokenFromReq(req);

  if (token) {
    try {
      req.decodedToken = jwtUtil.verifyToken(token);
      return next();
    } catch (err) {
      switch (err.name) {
        case 'TokenExpiredError':
          return failureResponse(res, JWT_EXPIRED, BAD_REQUEST_CODE);
        default:
          return failureResponse(res, JWT_MALFORMED, BAD_REQUEST_CODE);
      }
    }
  }
  return failureResponse(res, UNAUTHORIZED_REQUEST, UNAUTHORIZED_CODE);
};
module.exports = jwtValidator;
