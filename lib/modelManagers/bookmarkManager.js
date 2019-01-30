const { Bookmarks, Articles } = require('../../database/models/');

/**
 * Bookmark Manager Class
 */
class BookmarkManager {
  /**
   * Function to bookmark article
   * @param { UUID } userId
   * @param { UUID } articleId
   * @returns {object} Rows from query result
   */
  static async createBookmark(userId, articleId) {
    const bookmark = await Bookmarks.create({
      userId,
      articleId
    });
    return bookmark;
  }

  /**
   * Function to get all users bookmarked articles
   * @param { UUID } userId
   * @returns {object} bookmark object
   * otherwise it throws an error
   */
  static async getBookmarkedArticles(userId) {
    const bookmarks = await Bookmarks.findAndCountAll({
      attributes: ['createdAt', 'updatedAt'],
      include: [
        {
          model: Articles,
          where: Articles.Id,
          attributes: ['id', 'title', 'featuredImageUrl'],
        },
      ],
      order: [['createdAt', 'DESC']],
      where: { userId },
    });
    return {
      count: bookmarks.count,
      bookmarks: bookmarks.rows
    };
  }

  /**
   * Function to get all users bookmarked articles
   * @param { UUID } userId
   * @param { UUID } articleId
   * @returns {object} bookmark object
   */
  static async getBookamrkedArticle(userId, articleId) {
    const bookmark = await Bookmarks.findOne({
      where: { userId, articleId },
    });
    return bookmark;
  }

  /**
   * Function to delete a bookmark to article with articleId and userId
  * @param { UUID } articleId
   * @param { UUID } userId
   * @returns {object} Rows from query result
   */
  static async deleteBookmark(articleId, userId) {
    const bookmark = await Bookmarks.destroy({
      where: {
        articleId,
        userId,
      }
    });
    return bookmark;
  }
}

module.exports = BookmarkManager;
