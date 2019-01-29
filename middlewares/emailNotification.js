
const sendVerficationMail = require('../lib/utils/sendNotifications');
/**
 *
 *
 * @class emailNotification
 */
class emailNotification {
  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns {*} object
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
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}


module.exports = emailNotification;
