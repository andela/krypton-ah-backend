const Sequelize = require('sequelize');
const { ArticlesComments } = require('../../database/models');

const { Op } = Sequelize;

/**
 * Comment History Manager Class
 */
class CommentsHistoryManager {
  /**
   * @static
   * @memberof ArticlesComments
   * @param {string} columnName The field to search
   * @param {string} value THe value to search for in the field
   * @returns {object} The query result.
   */
  static async getModifiedComments(columnName, value) {
    const commentHistory = await ArticlesComments.findAll({
      where: {
        [columnName]: value,
        $or: [{ updated: true }, { deleted: true }],
        originalId: {
          [Op.eq]: null
        }
      },
      attributes: [
        'id', 'comment', 'userId', 'articleId', 'mainCommentId', 'updated', 'deleted', 'createdAt', 'updatedAt'
      ],
      include:
        [{
          model: ArticlesComments,
          as: 'history',
          attributes: [
            'id', 'comment', 'createdAt', 'updatedAt', 'updated', 'deleted'
          ],
          order: [['updatedAt', 'ASC']],
        }],
      order: [['originalDate', 'DESC']],
    });
    return commentHistory;
  }
}
module.exports = CommentsHistoryManager;
