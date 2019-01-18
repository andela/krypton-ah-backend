const sgMail = require('@sendgrid/mail'),
  { FROM } = require('../../../constants');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * sends E-mail.
 * @param {string} to Receiver of mail.
 * @param {string} subject Subject of Mail.
 * @param {html} html Html file
 * @returns {promise} Promise
 */
const sendMail = (to, subject, html) => {
  const msg = {
    to,
    from: FROM,
    subject,
    html,
  };

  return sgMail.send(msg);
};

module.exports = sendMail;
