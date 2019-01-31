const { ArticlesComments } = require('../../database/models');

/**
 * Comment History Manager Class
 */
class CommentsHistoryManager {
  /**
   * @static
   * @memberof ArticlesComments
   * @returns {object} The query result.
   */
  static async getAllHistory() {
    const commentHistory = await ArticlesComments.findAndCountAll({
      where: {
        $or: [{ updated: true }, { deleted: true }]
      },
      order: [['updatedAt', 'DESC']],
    });
    return commentHistory;
  }

  /**
   * @static
   * @memberof ArticlesComments
   * @param {string} columnName The field to search
   * @param {string} value THe value to search for in the field
   * @returns {object} The query result.
   */
  static async getHistory(columnName, value) {
    const commentHistory = await ArticlesComments.findAndCountAll({
      where: {
        [columnName]: value,
        $or: [{ updated: true }, { deleted: true }]
      },
      order: [['updatedAt', 'DESC']],
    });
    return commentHistory;
  }
}
module.exports = CommentsHistoryManager;
