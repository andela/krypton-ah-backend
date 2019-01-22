const dotenv = require('dotenv'),
  jwtUtil = require('../jwtUtil'),
  sendMail = require('./mailler'),
  { RESET_LINK_EXPIRE, RESET_LINK_URL, RESET_LINK_SUBJECT } = require('../../../constants'),
  resetTemplate = require('./emailTemplate/resetPassword');

dotenv.config();

/**
 * sends E-mail.
 * @param {string} verifiedEmail Receiver of mail.
 * @param {string} uuid Receiver of mail user ID.
 * @returns {promise} Promise
 */
const resetPassword = async (verifiedEmail, uuid) => {
  const tokenGenerated = jwtUtil.generateToken(RESET_LINK_EXPIRE, uuid);

  const url = RESET_LINK_URL + tokenGenerated;

  const sendResetMail = await sendMail(verifiedEmail, RESET_LINK_SUBJECT, resetTemplate(url));

  return sendResetMail;
};

module.exports = resetPassword;
