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
  OPERATION_SUCCESSFUL,
  OK_CODE,
  VERIFY_CRIDENTIALS,
  NUMBER_OF_REACTIONS,
  BAD_REQUEST_CODE,
  DISLIKE
} = require('../constants');
const { successResponse, serverFailure, failureResponse } = require('../lib/utils/messageHandler');

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
    const where = {
      articleId: req.params.articleId
    };

    try {
      const allReactions = await getTotalReactions(where),
        dislikes = allReactions.filter(article => article.reaction === DISLIKE),
        likes = allReactions.length - dislikes.length;
      return successResponse(res, NUMBER_OF_REACTIONS, OK_CODE, {
        dislikes: dislikes.length,
        likes
      });
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
    const reaction = req.query.reaction.toLowerCase();
    try {
      const userReaction = await getUserReaction(req.params.articleId, req.decodedToken.payLoad.id);
      if (userReaction) {
        await updateReaction(reaction, req.params.articleId, req.decodedToken.payLoad.id);
        return successResponse(res, OPERATION_SUCCESSFUL);
      }
      newReaction = await createReaction(
        req.params.articleId,
        req.decodedToken.payLoad.id,
        reaction
      );
      return successResponse(res, OPERATION_SUCCESSFUL, OK_CODE, { newReaction });
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
      const removedReaction = await removeReaction(req.params.reactionId, req.decodedToken.payLoad);
      if (removedReaction) {
        return successResponse(res, RESET_REACTION);
      }
      return failureResponse(res, VERIFY_CRIDENTIALS, BAD_REQUEST_CODE);
    } catch (error) {
      return serverFailure(res, SERVER_ERROR_MESSAGE);
    }
  }
}
module.exports = ArticlesReactionController;
