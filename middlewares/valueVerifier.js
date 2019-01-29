const { getComment } = require('../lib/modelManagers/commentsReactionModel');
const { getArticlesby } = require('../lib/modelManagers/articlemodel');
const {
  SERVER_ERROR_MESSAGE,
  COMMENT_NOT_FOUND,
  REACTIONS,
  INVALID_REACTION_ID,
  ARTICLE_NOT_FOUND,
  ID,
  INVALID_REACTION,
  BAD_REQUEST_CODE
} = require('../constants');
const { failureResponse, serverFailure } = require('../lib/utils/messageHandler');

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
      return serverFailure(res, SERVER_ERROR_MESSAGE);
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
      return serverFailure(res, SERVER_ERROR_MESSAGE);
    }
  }

  /**
   *
   *
   * @static
   * @param {*} modelManager
   * @memberof valueVerifier
   * @returns {*} something
   */
  static verifyReactionId(modelManager) {
    return async (req, res, next) => {
      try {
        const reaction = await modelManager(req.params.reactionId);

        if (reaction) {
          return next();
        }
        return failureResponse(res, INVALID_REACTION_ID);
      } catch (error) {
        return serverFailure(res, SERVER_ERROR_MESSAGE);
      }
    };
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
    return REACTIONS.includes(req.params.reaction || req.query.reaction)
      ? next()
      : failureResponse(res, INVALID_REACTION, BAD_REQUEST_CODE);
  }
}

module.exports = valueVerifier;
