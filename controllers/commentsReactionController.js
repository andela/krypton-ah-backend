const {
  getReaction,
  createReaction,
  updateReaction,
  removeReaction
} = require('../lib/modelManagers/commentsReactionModel');
const { SERVER_ERROR_MESSAGE, RESET_REACTION, RESOURCE_CREATED_CODE } = require('../constants');
const { successResponse, serverFailure, formatReaction } = require('../lib/utils/messageHandler');

let newReaction;
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
   * @memberof commentsReactionController
   * @returns {object} response of the request
   */
  static async likeOrDislike(req, res) {
    const message = formatReaction(req.params.reaction);
    try {
      const reactionId = await getReaction(req.params.commentId, req.decodedToken.payLoad);
      if (reactionId) {
        await updateReaction(req.params.reaction, req.params.commentId, req.decodedToken.payLoad);
        return successResponse(res, message);
      }
      newReaction = await createReaction(
        req.params.commentId,
        req.decodedToken.payLoad,
        req.params.reaction
      );
      return successResponse(res, message, RESOURCE_CREATED_CODE, newReaction);
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
   * @memberof commentsReactionController
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
module.exports = commentsReactionController;
