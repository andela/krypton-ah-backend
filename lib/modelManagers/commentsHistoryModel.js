const { commentsHistory } = require('../../database/models/');

/**
 * Comment History Manager Class
 */
class CommentsHistoryManager {
/**
   * @param {object} oldComment Id of comment to be saved.
   * @static
   * @memberof Rating
   * @returns {object} The row added or updated.
   */
  static async createCommentHistory(oldComment) {
    const commentHistory = await commentsHistory.create({
      commentId: oldComment.commentId,
      previousComment: oldComment.content,
      action: oldComment.action
    });
    return commentHistory;
  }

  /**
   * @param {object} commentId Id of comment to get.
   * @static
   * @memberof Rating
   * @returns {object} The query result.
   */
  static async getCommentHistory(commentId) {
    const commentHistory = await commentsHistory.findAndCountAll({
      where: {
        commentId
      },
      order: [['createdAt', 'DESC']],
    });
    return commentHistory;
  }
}

module.exports = CommentsHistoryManager;
