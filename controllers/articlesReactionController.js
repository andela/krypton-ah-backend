const {
  getUserReaction,
  createReaction,
  updateReaction,
  removeReaction,
  getTotalReactions
} = require('../lib/modelManagers/articlesReactionModel');

const {
  SERVER_ERROR_MESSAGE,
  RESET_REACTION,
  ARTICLE_REACTION_STATUS,
  OK_CODE
} = require('../constants');
const {
  successResponse,
  serverFailure,
  formatReaction,
  formatMessage
} = require('../lib/utils/messageHandler');

let newReaction;
/**
 *
 *
 * @class commentsReactionController
 */
class ArticlesReactionController {
  /**
   *
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @memberof ArticlesReactionController
   * @returns {object} response of the request
   */
  static async allReactions(req, res) {
    const message = formatMessage(req.query.reaction);
    try {
      const numberOfReactions = await getTotalReactions(req.params.articleId, req.query.reaction);
      return successResponse(res, message, OK_CODE, { numberOfReactions });
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
   * @memberof ArticlesReactionController
   * @returns {object} response of the request
   */
  static async likeOrDislike(req, res) {
    const message = formatReaction(req.query.reaction, ARTICLE_REACTION_STATUS);
    try {
      const userReaction = await getUserReaction(req.params.articleId, req.decodedToken.payLoad);
      if (userReaction) {
        await updateReaction(req.query.reaction, req.params.articleId, req.decodedToken.payLoad);
        return successResponse(res, message);
      }
      newReaction = await createReaction(
        req.params.articleId,
        req.decodedToken.payLoad,
        req.query.reaction
      );
      return successResponse(res, message, OK_CODE, { newReaction });
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
   * @memberof ArticlesReactionController
   * @returns {object} response of the request
   */
  static async cancelReaction(req, res) {
    try {
      const removedReaction = await removeReaction(req.params.reactionId);
      if (removedReaction) {
        return successResponse(res, RESET_REACTION);
      }
    } catch (error) {
      return serverFailure(res, SERVER_ERROR_MESSAGE);
    }
  }
}
module.exports = ArticlesReactionController;
