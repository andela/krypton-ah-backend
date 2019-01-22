require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const emailTemplate = require('./emailTemplate');
const response = require('../responses');
const {
  FROM,
  SUBJECT,
  RESOURCE_CREATED_CODE,
  SERVER_ERROR_CODE,
  ACCOUNT_CREATED,
  SERVER_ERROR
} = require('../../../constants');

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

  const hostUrl = `${baseUrl}/verifyemail/${jwtToken}`;
  const msg = {
    to: email,
    from: FROM,
    subject: SUBJECT,
    html: emailTemplate(hostUrl)
  };

  try {
    const sendMail = await sgMail.send(msg);
    if (sendMail) {
      return response(res, RESOURCE_CREATED_CODE, true, ACCOUNT_CREATED);
    }
  } catch (error) {
    return response(res, SERVER_ERROR_CODE, false, SERVER_ERROR);
  }
}
module.exports = sendVerificationMail;
