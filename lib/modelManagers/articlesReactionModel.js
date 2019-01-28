const { ArticlesReactions } = require('../../database/models');

/**
 * comments reaction model manager
 */
class ArticlesReaction {
  /**
   *
   *
   * @static
   * @param {uuid} articleId
   * @param {String} reaction
   * @returns {Object} reaction
   * @memberof ArticlesReaction
   */
  static async getArticleReactions(articleId, reaction) {
    const reactions = await ArticlesReactions.findAndCountAll({
      where: { articleId, reaction }
    });
    return reactions;
  }

  /**
   *
   *
   * @static
   * @param {uuid} articleId
   * @param {uuid} userId
   * @returns {Object} reaction
   * @memberof ArticlesReaction
   */
  static async getUserReaction(articleId, userId) {
    const reaction = await ArticlesReactions.findOne({
      where: { userId, articleId },
      attributes: ['userId', 'articleId', 'reaction']
    });
    return reaction;
  }

  /**
   *
   *
   * @static
   * @param {uuid} reactionId
   * @memberof ArticlesReaction
   * @returns {object} reaction
   */
  static async findReaction(reactionId) {
    const reaction = await ArticlesReactions.findOne({
      where: { id: reactionId }
    });
    return reaction;
  }

  /**
   *
   *
   * @static
   * @param {uuid} articleId
   * @param {uuid} userId
   * @param {string} reaction
   * @returns {*} newReaction
   * @memberof ArticlesReaction
   */
  static async createReaction(articleId, userId, reaction) {
    const newReaction = await ArticlesReactions.create({
      userId,
      articleId,
      reaction
    });
    return newReaction;
  }

  /**
   * @param {string} newReaction
   * @param {uuid} articleId
   * @param {uuid} userId
   * @returns {*} response
   * @memberof ArticlesReaction
   */
  static async updateReaction(newReaction, articleId, userId) {
    await ArticlesReactions.update({ reaction: newReaction }, { where: { userId, articleId } });
  }

  /**
   *
   *
   * @static
   * @param {uuid} reactionId
   * @returns {Boolean} removedReaction
   * @memberof ArticlesReaction
   */
  static async removeReaction(reactionId) {
    const removedReaction = await ArticlesReactions.destroy({
      where: { id: reactionId }
    });
    return removedReaction;
  }
}

module.exports = ArticlesReaction;
