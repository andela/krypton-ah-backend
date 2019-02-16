const { FORBIDDEN_CODE } = require('../constants/index'),
  { failureResponse } = require('../lib/utils/messageHandler');
/**
 * Token validator middleware.
 * @param {string} role - The request sent by user.
 * @param {object} res - The response sent to user.
 * @param {function} next - Next function to be called.
 * @returns {object} The status of response and body of the response.
 */
const RoleValidator = role => (req, res, next) => {
  if (req.decodedToken.payLoad.role.includes(role)) {
    return next();
  }
  return failureResponse(res, 'Unauthorized Access', FORBIDDEN_CODE);
};

module.exports = RoleValidator;
