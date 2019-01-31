const { ArticlesComments, CommentsReactions } = require('../../database/models');

/**
 * comments reaction model manager
 */
class commentsReactionModel {
  /**
   *
   *@param {uuid} id The id from request parameter
   * @memberof commentsReactionModel
   * @returns {Boolean}  comment
   */
  static async getComment(id) {
    const comment = await ArticlesComments.findOne({ where: { id } });
    return !!comment;
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
  static async getUserReaction(commentId, userId) {
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
   * @param {uuid} reactionId
   * @memberof commentsReactionModel
   * @returns {object} reaction
   */
  static async findReaction(reactionId) {
    const reaction = await CommentsReactions.findOne({
      where: { id: reactionId }
    });
    return reaction;
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
   * @param {uuid} userId
   * @returns {Boolean} removedReaction
   * @memberof commentsReactionModel
   */
  static async removeReaction(reactionId, userId) {
    const removedReaction = await CommentsReactions.destroy({
      where: { id: reactionId, UserId: userId }
    });
    return removedReaction;
  }
}

module.exports = commentsReactionModel;
