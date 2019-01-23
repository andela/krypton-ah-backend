const {
  confirmCommentId,
  checkIfReactionExist,
  createReaction,
  updateOrRemoveReaction
} = require('../lib/modelManagers/commentsReactionModel');
const {
  SERVER_ERROR_MESSAGE,
  COMMENT_NOT_FOUND,
  REACTION_STATUS,
  RESET_REACTION
} = require('../constants');
const { successResponse, failureResponse, serverFailure } = require('../lib/utils/messageHandler');

const reaction = ['like', 'dislike'];
/**
 *
 *
 * @class commentsReactionController
 */
class commentsReactionController {
  /**
   *
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object| next} response | next function
   * @memberof commentsReactionController
   */
  static async verifyCommentId(req, res, next) {
    try {
      const commentId = await confirmCommentId(req.params.commentId);

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
   * @param {function} next
   * @returns {object | function} response or next function
   * @memberof commentsReactionController
   */
  static async validateReaction(req, res, next) {
    return reaction.includes(req.params.reaction)
      ? next()
      : serverFailure(res, SERVER_ERROR_MESSAGE);
  }

  /**
   *
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @memberof commentsReactionController
   * @returns {object} response of the request
   */
  static async likeDislikeReset(req, res) {
    try {
      const reactionStatus = await checkIfReactionExist(
        req.params.commentId,
        req.decodedToken.payLoad
      );
      if (reactionStatus) {
        const removedReaction = await updateOrRemoveReaction(
          req.params.commentId,
          req.decodedToken.payLoad,
          req.params.reaction,
          reactionStatus.reaction
        );
        if (removedReaction) {
          return successResponse(res, RESET_REACTION);
        }
      } else {
        await createReaction(req.params.commentId, req.decodedToken.payLoad, req.params.reaction);
      }
      return successResponse(
        res,
        [REACTION_STATUS.slice(0, 22), req.params.reaction, REACTION_STATUS.slice(22)].join('')
      );
    } catch (error) {
      return serverFailure(res, SERVER_ERROR_MESSAGE);
    }
  }
}
module.exports = commentsReactionController;
