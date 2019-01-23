const { getComment } = require('../lib/modelManagers/commentsReactionModel');
const { CommentsReactions } = require('../database/models');
const {
  SERVER_ERROR_MESSAGE,
  COMMENT_NOT_FOUND,
  REACTIONS,
  INVALID_REACTION_ID
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
  static async verifyReactionId(req, res, next) {
    try {
      const reactionId = await CommentsReactions.findOne({
        where: { id: req.params.reactionId }
      });
      if (reactionId) {
        return next();
      }
      return failureResponse(res, INVALID_REACTION_ID);
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
   * @memberof valueVerifier
   */
  static async validateReaction(req, res, next) {
    return REACTIONS.includes(req.params.reaction)
      ? next()
      : serverFailure(res, SERVER_ERROR_MESSAGE);
  }
}
module.exports = valueVerifier;
