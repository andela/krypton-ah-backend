const Sequelize = require('sequelize'),
  { Rating } = require('../../database/models/');

/**
 * Article Rating Manager Class
 */
class articleRatingManager {
  /**
   * @param {object} newRating Contain articleId, reviewerId and rating.
   * @param {object} transaction Optional for transactions.
   * @static
   * @memberof Rating
   * @returns {object} The row added or updated.
   */
  static async createRating(newRating, transaction = { }) {
    const existingRating = await Rating.findOne({
      where: {
        reviewerId: newRating.reviewerId,
        articleId: newRating.articleId,
      }
    }, transaction);

    if (existingRating) {
      const updatedRating = await existingRating.update({
        rating: newRating.rating
      });
      return updatedRating;
    }

    const rating = await Rating.create(newRating);
    return rating;
  }

  /**
   * @param {uuid} reviewerId The user's id.
   * @param {uuid} articleId The article's id.
   * @static
   * @memberof Rating
   * @returns {object} A row containing users rating for an article.
   */
  static async userRating(reviewerId, articleId) {
    const getRating = await Rating.findOne({
      where: {
        reviewerId,
        articleId
      },
      attributes: ['rating']
    });

    return getRating;
  }

  /**
   * @param {uuid} articleId The article's id.
   * @param {object} transaction Optional for transactions.
   * @static
   * @memberof Rating
   * @returns {object} An object with average rating and number of reviewer.
   */
  static async getRatingDetails(articleId, transaction = { }) {
    const ratingDetails = await Rating.findAll({
      where: { articleId },
      attributes: [
        [Sequelize.fn('AVG', Sequelize.col('rating')), 'averageRating'],
        [Sequelize.fn('COUNT', '*'), 'numberOfReviews']
      ]
    }, transaction);

    return ratingDetails;
  }
}


module.exports = articleRatingManager;
