const { getComment } = require('../lib/modelManagers/commentsReactionModel');
const { getArticlesby } = require('../lib/modelManagers/articlemodel');
const {
  COMMENT_NOT_FOUND,
  REACTIONS,
  ARTICLE_NOT_FOUND,
  PARAMS_ERROR_MESSAGE,
  ID,
  INVALID_REACTION,
  BAD_REQUEST_CODE
} = require('../constants');
const { failureResponse } = require('../lib/utils/messageHandler');

/**
 *
 *
 * @class IdVerifier
 */
class valueVerifier {
  /**
   *
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object| next} response | next function
   * @memberof valueVerifier
   */
  static async verifyCommentId(req, res, next) {
    try {
      const commentId = await getComment(req.params.commentId);

      if (commentId) {
        return next();
      }
      return failureResponse(res, COMMENT_NOT_FOUND);
    } catch (error) {
      return failureResponse(res, PARAMS_ERROR_MESSAGE, BAD_REQUEST_CODE);
    }
  }

  /**
   *
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object| next} response | next function
   * @memberof valueVerifier
   */
  static async verifyArticleId(req, res, next) {
    try {
      const article = await getArticlesby(ID, req.params.articleId);
      if (article.length > 0) {
        return next();
      }
      return failureResponse(res, ARTICLE_NOT_FOUND);
    } catch (error) {
      return failureResponse(res, PARAMS_ERROR_MESSAGE, BAD_REQUEST_CODE);
    }
  }

  /**
   *
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object | function} response or next function
   * @memberof valueVerifier
   */
  static async validateReaction(req, res, next) {
    const reactionValue = req.params.reaction || req.query.reaction;
    return REACTIONS.includes(reactionValue.toLowerCase())
      ? next()
      : failureResponse(res, INVALID_REACTION, BAD_REQUEST_CODE);
  }
}

module.exports = valueVerifier;
