require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const emailTemplate = require('./followedauthornotificationTemplate');
const response = require('../responses');
const {
  FROM,
  NEW_ARTICLE_SUBJECT,
  SERVER_ERROR_CODE,
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

  const { email } = req;

  const hostUrl = `${baseUrl}/`;
  const msg = {
    to: email,
    from: FROM,
    subject: NEW_ARTICLE_SUBJECT,
    html: emailTemplate(hostUrl, req.recipient, req.author, req.title)
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    return response(res, SERVER_ERROR_CODE, false, SERVER_ERROR);
  }
}
module.exports = sendVerificationMail;
