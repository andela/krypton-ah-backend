const jwtUtil = require('../lib/utils/jwtUtil');
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
      next();
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message
      });
    }
  }
  return res.status(400).json({
    success: false,
    message: 'No token provided'
  });
};
module.exports = jwtValidator;
