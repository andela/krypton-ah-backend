const { ArticlesComments, CommentsReactions } = require('../../database/models');

/**
 * comments reaction model manager
 */
class commentsReactionModel {
  /**
   *
   *@param {uuid} id The id from request parameter
   * @memberof commentsReactionModel
   * @returns {uuid} The parameters from the query
   */
  static async getComment(id) {
    const commentId = await ArticlesComments.findOne({ where: { id } });
    return !!commentId;
  }

  /**
   *
   *
   * @static
   * @param {uuid} commentId
   * @param {uuid} userId
   * @returns {Boolean} reactionStatus
   * @memberof commentsReactionModel
   */
  static async getReaction(commentId, userId) {
    const reactionStatus = await CommentsReactions.findOne({
      where: { UserId: userId, commentId },
      attributes: ['UserId', 'commentId', 'reaction']
    });
    return reactionStatus;
  }

  /**
   *
   *
   * @static
   * @param {uuid} commentId
   * @param {uuid} userId
   * @param {string} reaction
   * @returns {*} newReaction
   * @memberof commentsReactionModel
   */
  static async createReaction(commentId, userId, reaction) {
    const newReaction = await CommentsReactions.create({
      UserId: userId,
      commentId,
      reaction
    });
    return newReaction;
  }

  /**
   * @param {string} newReaction
   * @param {uuid} commentId
   * @param {uuid} userId
   * @returns {*} response
   * @memberof commentsReactionModel
   */
  static async updateReaction(newReaction, commentId, userId) {
    await CommentsReactions.update(
      { reaction: newReaction },
      { where: { UserId: userId, commentId } }
    );
  }

  /**
   *
   *
   * @static
   * @param {uuid} reactionId
   * @returns {Boolean} removedReaction
   * @memberof commentsReactionModel
   */
  static async removeReaction(reactionId) {
    const removedReaction = await CommentsReactions.destroy({
      where: { id: reactionId }
    });
    return removedReaction;
  }
}

module.exports = commentsReactionModel;
