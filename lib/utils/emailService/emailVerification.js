require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const emailTemplate = require('./emailTemplate');
const ArticleNotificationTemplate = require('./followedauthornotificationTemplate');
const followingNotificationTemplate = require('./followerNotificationtemplate');
const commentNotificationTemplate = require('./commentNotification');
const threadNotificationTemplate = require('./threadNotification');
const response = require('../responses');
const {
  FROM,
  SUBJECT,
  RESOURCE_CREATED_CODE,
  ACCOUNT_CREATED,
  NEW_FOLLOWER_SUBJECT,
  NEW_ARTICLE_SUBJECT
} = require('../../../constants');
const {
  successResponse,
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
/**
  *
  *
  * @param {*} req
  * @param {*} res
  * @returns {*} object
  */
async function sendArticleNotificationMail(req, res) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const { jwtToken, email } = req;

  const hostUrl = `${baseUrl}/verifyemail/${jwtToken}`;
  const msg = {
    to: email,
    from: FROM,
    subject: NEW_ARTICLE_SUBJECT,
    html: ArticleNotificationTemplate(hostUrl, req.recipient, req.author, req.title)
  };

  try {
    const sendMail = await sgMail.send(msg);
    if (sendMail) {
      return ('success');
    }
  } catch (error) {
    return response(res, SERVER_ERROR_CODE, false, SERVER_ERROR);
  }
}
/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @returns {*} object
 */
async function sendFollowingNotificationMail(req, res) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const { jwtToken, email } = req;

  const hostUrl = `${baseUrl}/verifyemail/${jwtToken}`;
  const msg = {
    to: email,
    from: FROM,
    subject: NEW_FOLLOWER_SUBJECT,
    html: followingNotificationTemplate(hostUrl, req.recipient, req.follower, req.title)
  };

  try {
    const sendMail = await sgMail.send(msg);
    if (sendMail) {
      return ('success');
    }
  } catch (error) {
    return response(res, SERVER_ERROR_CODE, false, SERVER_ERROR);
  }
}

/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @returns {*} object
 */
async function sendCommentNotificationMail(req, res) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const { email } = req;

  const hostUrl = `${baseUrl}/`;
  const msg = {
    to: email,
    from: FROM,
    subject: AUTHOR_COMMENT_SUBJECT,
    html: commentNotificationTemplate(
      hostUrl,
      req.commenter,
      req.recipient,
      req.article,
      req.comment
    )
  };
  try {
    const sendMail = await sgMail.send(msg);
    if (sendMail) {
      return ('success');
    }
  } catch (error) {
    return response(res, SERVER_ERROR_CODE, false, SERVER_ERROR);
  }
}

/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @returns {*} object
 */
async function sendCommentThreadNotificationMail(req, res) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const { email } = req;

  const hostUrl = `${baseUrl}/`;
  const msg = {
    to: email,
    from: FROM,
    subject: THREAD_SUBJECT,
    html: threadNotificationTemplate(
      hostUrl,
      req.commenter,
      req.recipient,
      req.article,
      req.comment,
      req.mainComment
    )
  };
  try {
    const sendMail = await sgMail.send(msg);
    if (sendMail) {
      return ('success');
    }
  } catch (error) {
    return response(res, SERVER_ERROR_CODE, false, SERVER_ERROR);
  }
}

module.exports = {
  sendVerificationMail,
  sendFollowingNotificationMail,
  sendArticleNotificationMail,
  sendCommentNotificationMail,
  sendCommentThreadNotificationMail
};
