require('dotenv').config();
const sendMail = require('../emailService/mailler');
const emailTemplate = require('./emailTemplate');
const {
  SUBJECT,
  RESOURCE_CREATED_CODE,
  ACCOUNT_CREATED,
  RESEND_ACTIVATION_MAIL
} = require('../../../constants');
const {
  successResponse,
  serverFailure
} = require('../messageHandler');

const baseUrl = process.env.APP_BASE_URL;

/**
 * Sends Verification Mail.
 * @constructor
 * @param {string} req
 * @param {string} res
 * @param {string} next
 * @returns {Object} response object
 */
async function sendVerificationMail(req, res) {
  const { jwtToken, email, callbackUrl } = req;

  let hostUrl;
  if (callbackUrl) {
    hostUrl = `${baseUrl}/api/v1/users/verifyemail/${jwtToken}?callbackUrl=${callbackUrl}`;
  } else {
    hostUrl = `${baseUrl}/api/v1/users/verifyemail/${jwtToken}`;
  }

  try {
    const VerificationMail = await sendMail(email, SUBJECT, emailTemplate(hostUrl));
    if (VerificationMail) {
      if (req.resend) {
        return successResponse(res, RESEND_ACTIVATION_MAIL);
      }
      return successResponse(res, ACCOUNT_CREATED, RESOURCE_CREATED_CODE);
    }
  } catch (error) {
    return serverFailure(res);
  }
}
module.exports = sendVerificationMail;
