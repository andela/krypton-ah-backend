const jwtUtil = require('../lib/utils/jwtUtil'),
  {
    BAD_REQUEST_CODE,
    UNSUCCESSFUL,
    NO_TOKEN_PROVIDED,
    JWT_EXPIRED,
    JWT_MALFORMED
  } = require('../constants/index');
/**
 * Token validator middleware.
 * @param {object} req - The request sent by user.
 * @param {object} res - The response sent to user.
 * @param {function} next - Next function to be called.
 * @returns {object} The status of response and body of the response.
 */
const jwtValidator = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers.token || req.params;

  if (token) {
    try {
      req.decodedToken = jwtUtil.verifyToken(token);
      return next();
    } catch (err) {
      switch (err.name) {
        case 'TokenExpiredError':
          return res.status(BAD_REQUEST_CODE).json({
            success: UNSUCCESSFUL,
            message: JWT_EXPIRED
          });

        default:
          return res.status(BAD_REQUEST_CODE).json({
            success: UNSUCCESSFUL,
            message: JWT_MALFORMED
          });
      }
    }
  }
  return res.status(BAD_REQUEST_CODE).json({
    success: UNSUCCESSFUL,
    message: NO_TOKEN_PROVIDED
  });
};
module.exports = jwtValidator;
