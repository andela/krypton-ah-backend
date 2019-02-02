const { ArticlesHighlights } = require('../../database/models');
/**
 * Declares article highlight model manager class.
 */
class ArticlesHighlightManager {
  /**
   * Create a new article highlight
   * @param {object} articleHighlightDetails
   * @returns {object} The created article highlight
   */
  static async createArticlesHighlight(articleHighlightDetails) {
    const createdArticlesHighLight = await ArticlesHighlights.create(articleHighlightDetails);
    return createdArticlesHighLight;
  }
}

module.exports = ArticlesHighlightManager;
