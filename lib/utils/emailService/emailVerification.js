require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const emailTemplate = require('./emailTemplate');
const {
  FROM,
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
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const { jwtToken, email } = req;

  const hostUrl = `${baseUrl}/api/v1/users/verifyemail/${jwtToken}`;
  const msg = {
    to: email,
    from: FROM,
    subject: SUBJECT,
    html: emailTemplate(hostUrl)
  };

  try {
    const sendMail = await sgMail.send(msg);
    if (sendMail) {
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
