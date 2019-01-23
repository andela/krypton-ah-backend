const rating = require('../lib/modelManagers/articleRatingModel'),
  { sequelize } = require('../database/models'),
  { updateArticle } = require('../lib/modelManagers/articlemodel'),
  response = require('../lib/utils/responses'),
  {
    OK_CODE,
    RESOURCE_CREATED_CODE,
    SERVER_ERROR_MESSAGE,
    SERVER_ERROR_CODE,
    NOT_FOUND_CODE,
    GET_USER_RATING,
    GET_USER_RATING_ERROR,
    RATING_CREATED
  } = require('../constants/index');

/**
 * @description Article Rating Controller Class.
 */
class articleRating {
  /**
  * Creates or Update Rating.
  * @param {object} req Request Object.
  * @param {object} res Response Object.
  * @returns {object} Response with status, success true or false, and message.
  */
  static async createRating(req, res) {
    const newRating = {
      reviewerId: req.body.reviewerId,
      articleId: req.body.articleId,
      rating: req.body.rating
    };

    const transaction = await sequelize.transaction();
    try {
      const result = await rating.createRating(newRating, { transaction });
      const ratingDetails = await rating.getRatingDetails(req.body.articleId, { transaction });
      const body = {
        averageRating: ratingDetails[0].dataValues.averageRating,
        numberOfReviews: ratingDetails[0].dataValues.numberOfReviews
      };
      await updateArticle(body, req.body.articleId, { transaction });
      await transaction.commit();
      return response(res, RESOURCE_CREATED_CODE, true, RATING_CREATED, result);
    } catch (error) {
      await transaction.rollback();
      response(res, SERVER_ERROR_CODE, false, SERVER_ERROR_MESSAGE);
    }
  }

  /**
  * Gets Specific User Rating for a Specific Article.
  * @param {object} req Request Object.
  * @param {object} res Response Object.
  * @returns {object} Response with status, success true or false, and message.
  */
  static async getUserRating(req, res) {
    const { reviewerId } = req.params,
      { articleId } = req.params;
    try {
      const result = await rating.userRating(reviewerId, articleId);
      if (!result) {
        return response(res, NOT_FOUND_CODE, false, GET_USER_RATING_ERROR);
      }
      return response(res, OK_CODE, true, GET_USER_RATING, result);
    } catch (error) {
      response(res, SERVER_ERROR_CODE, false, SERVER_ERROR_MESSAGE);
    }
  }
}

module.exports = articleRating;
