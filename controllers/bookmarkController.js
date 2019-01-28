const bookmark = require('../lib/modelManagers/bookmarkManager'),
  { successResponse, serverFailure, failureResponse } = require('../lib/utils/messageHandler'),
  {
    OK_CODE,
    RESOURCE_CREATED_CODE,
    SERVER_ERROR_MESSAGE,
    NOT_FOUND_CODE,
    BOOKMARKED,
    REMOVE_BOOKMARK,
    BOOKMARK_RETRIEVED,
    CONFLICT_CODE,
    BOOKMARKED_ALREADY,
    BOOKMARK_NOT_FOUND
  } = require('../constants/index');

/**
 * @description Bookmark Controller Class.
 */
class BookmarkController {
  /**
   * Bookmark an article
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @returns {object} User Object
   */
  static async bookmarkArticle(req, res) {
    const userId = req.decodedToken.payLoad;
    const { articleId } = req.body;
    try {
      const checkArticle = await bookmark.getBookamrkedArticle(userId, articleId);
      if (checkArticle) {
        return failureResponse(res, BOOKMARKED_ALREADY, CONFLICT_CODE);
      }
      const newBookmark = await bookmark.createBookmark(userId, articleId);
      return successResponse(res, BOOKMARKED, RESOURCE_CREATED_CODE, newBookmark);
    } catch (error) {
      return serverFailure(res, SERVER_ERROR_MESSAGE);
    }
  }

  /**
   * Get all users bookmarked articles
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @returns {object} User Object
   */
  static async getArticlesBookmarked(req, res) {
    const userId = req.decodedToken.payLoad;
    try {
      const foundArticles = await bookmark.getBookmarkedArticles(userId);
      const { count } = foundArticles,
        articles = foundArticles.bookmarks;

      const queryResult = { count, articles };
      return successResponse(res, BOOKMARK_RETRIEVED, OK_CODE, queryResult);
    } catch (error) {
      return serverFailure(res, SERVER_ERROR_MESSAGE);
    }
  }

  /**
   * Delete an article from users bookmark
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @returns {object} User Object
   */
  static async deleteBookmark(req, res) {
    const userId = req.decodedToken.payLoad;
    const { articleId } = req.body;
    try {
      const checkArticle = await bookmark.getBookamrkedArticle(userId, articleId);
      if (!checkArticle) {
        return failureResponse(res, BOOKMARK_NOT_FOUND, NOT_FOUND_CODE);
      }
      await bookmark.deleteBookmark(articleId, userId);
      return successResponse(res, REMOVE_BOOKMARK, OK_CODE);
    } catch (error) {
      return serverFailure(res, SERVER_ERROR_MESSAGE);
    }
  }
}

module.exports = BookmarkController;
