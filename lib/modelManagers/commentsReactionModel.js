const { articlesComments, commentsReactions } = require('../../database/models');
const compareReactions = require('../../lib/utils/compareReactions');

let storedReaction;

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
  static async confirmCommentId(id) {
    try {
      const commentId = await articlesComments.findOne({ where: { id } });

      return !!commentId;
    } catch (error) {
      throw error;
    }
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
  static async checkIfReactionExist(commentId, userId) {
    try {
      const reactionStatus = await commentsReactions.findOne({
        where: { UserId: userId, commentId },
        attributes: ['UserId', 'commentId', 'reaction']
      });
      return reactionStatus;
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   *
   * @static
   * @param {uuid} commentId
   * @param {uuid} userId
   * @param {string} reaction
   * @returns {objtec} newReaction
   * @memberof commentsReactionModel
   */
  static async createReaction(commentId, userId, reaction) {
    if (reaction === 'like') {
      storedReaction = true;
    } else {
      storedReaction = false;
    }
    try {
      await commentsReactions.create({
        UserId: userId,
        commentId,
        reaction: storedReaction
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   *
   * @static
   * @param {uuid} commentId
   * @param {uuid} userId
   * @param {string} newReaction
   * @param {Boolean} existingReaction
   * @returns {Boolean} removedReaction
   * @memberof commentsReactionModel
   */
  static async updateOrRemoveReaction(commentId, userId, newReaction, existingReaction) {
    const sameReactions = compareReactions(newReaction, existingReaction);
    if (sameReactions) {
      try {
        const removedReaction = await commentsReactions.destroy({
          where: { UserId: userId, commentId }
        });
        return removedReaction;
      } catch (error) {
        throw error;
      }
    } else {
      try {
        if (newReaction === 'like') {
          newReaction = true;
        } else {
          newReaction = false;
        }
        await commentsReactions.update(
          { reaction: newReaction },
          { where: { UserId: userId, commentId } }
        );
      } catch (error) {
        throw error;
      }
    }
  }
}

module.exports = commentsReactionModel;
