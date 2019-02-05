/* eslint-disable no-console */
const sendVerficationMail = require('../lib/utils/sendNotifications');
/**
 *
 *
 * @class emailNotification
 */
class emailNotification {
  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {*} response
   * @memberof emailNotification
   */
  static async notifyFollowers(req) {
    try {
      sendVerficationMail.sendArticleNotificationToAuthorFollowers(
        req.createdArticles.authorId,
        req.createdArticles.title,
        req.createdArticles.id
      );
    } catch (error) {
      console.log(error);
    }
  }

  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {*} object
   * @memberof emailNotification
   */
  static async followNotification(req) {
    try {
      sendVerficationMail.sendNotificationToFollowedUser(
        req.id,
        req.followeeId,
      );
    } catch (error) {
      console.log(error);
    }
  }

  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {*} response
   * @memberof emailNotification
   */
  static async CommentNotification(req) {
    try {
      if (req.mainCommentId) {
        sendVerficationMail.sendThreadNotificationToUser(
          req.commentDetails.id,
          req.commentDetails.comment,
          req.commentDetails.mainCommentId,
          req.commentDetails.userId,
          req.commentDetails.articleId
        );
      } else {
        sendVerficationMail.sendCommentNotificationToAuthor(
          req.commentDetails.id,
          req.commentDetails.comment,
          req.commentDetails.userId,
        );
        sendVerficationMail.sendCommentNotificationToArticlefFollower(
          req.commentDetails.id,
          req.commentDetails.comment,
          req.commentDetails.userId,
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
}


module.exports = emailNotification;
