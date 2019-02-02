const {
  getUserReaction,
  createReaction,
  updateReaction,
  removeReaction
} = require('../lib/modelManagers/commentsReactionModel');
const {
  SERVER_ERROR_MESSAGE,
  RESET_REACTION,
  RESOURCE_CREATED_CODE,
  OPERATION_SUCCESSFUL,
  VERIFY_CRIDENTIALS,
  BAD_REQUEST_CODE
} = require('../constants');
const { successResponse, serverFailure, failureResponse } = require('../lib/utils/messageHandler');

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
    try {
      const reactionId = await getUserReaction(req.params.commentId, req.decodedToken.payLoad);
      if (reactionId) {
        await updateReaction(req.params.reaction, req.params.commentId, req.decodedToken.payLoad);
        return successResponse(res, OPERATION_SUCCESSFUL);
      }
      newReaction = await createReaction(
        req.params.commentId,
        req.decodedToken.payLoad,
        req.params.reaction
      );
      return successResponse(res, OPERATION_SUCCESSFUL, RESOURCE_CREATED_CODE, newReaction);
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
module.exports = commentsReactionController;
