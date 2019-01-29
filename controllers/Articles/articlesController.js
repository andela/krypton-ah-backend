const articleModelManager = require('../../lib/modelManagers/articlemodel');
const response = require('../../lib/utils/helper_function');
const constants = require('../../constants');
const generateSlug = require('../../lib/utils/slugGenerator');
const generateTags = require('../../lib/utils/tagGenarator');

/**
 *
 *
 * @class ArticlesController
 */
class ArticlesController {
/**
 *
 *
 * @static
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {*} next
 * @memberof ArticlesController
 */
  static async createArticles(req, res, next) {
    const authorId = req.decodedToken.payLoad;
    const slug = generateSlug(req.body.title, authorId.toString());
    const articleDetails = { ...slug.slugs, authorId, ...req.body };
    try {
      const createdArticles = await articleModelManager.createArticle(articleDetails);
      generateTags(req.body.tags, createdArticles.dataValues.id);
      if (createdArticles) {
        req.createdArticles = { ...createdArticles, authorId };
        req.createdArticles = createdArticles;
        return (response.successResponse(
          res,
          constants.OK_CODE,
          createdArticles
        ),
        next());
      }
    } catch (error) {
      response.failureResponse(
        res,
        constants.SERVER_RETRIEVAL_MESSAGE,
        constants.SERVER_ERROR_CODE
      );
    }
  }

  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @return {*} object
   * @memberof ArticlesController
   */
  static async updateArticle(req, res) {
    const id = req.decodedToken.payload;
    const articleDetails = { ...id, ...req.body };
    try {
      const updatedArticle = await articleModelManager.updateArticle(articleDetails, req.params.id);
      if (updatedArticle[0] === 0) {
        response.failureResponse(res, constants.ARTICLES_UPDATE_FAILED);
      } else {
        response.successResponse(res, constants.ARTICLES_UPDATE_SUCCESS, updatedArticle);
      }
    } catch (error) {
      response.failureResponse(
        res,
        constants.SERVER_RETRIEVAL_MESSAGE,
        constants.SERVER_ERROR_CODE
      );
    }
  }

  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @return {*} object
   * @memberof ArticlesController
   */
  static async getArticles(req, res) {
    const { field, value } = req.params;
    try {
      const returnedArticle = await articleModelManager.getArticlesby(field, value);
      if (returnedArticle) {
        response.successResponse(res, constants.ARTICLES_RETRIEVAL_SUCCESS, returnedArticle);
      }
    } catch (error) {
      response.failureResponse(
        res,
        constants.SERVER_RETRIEVAL_MESSAGE,
        constants.SERVER_ERROR_CODE
      );
    }
  }

  /**
   *
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @return {*} *
   * @memberof ArticlesController
   */
  static async getArticle(req, res, next) {
    const { id } = req.params;
    try {
      const returnedArticle = await articleModelManager.getArticlesby('id', id);
      if (returnedArticle.length === 1) {
        response.successResponse(res, constants.ARTICLES_RETRIEVAL_SUCCESS, returnedArticle[0]);
        req.authorId = returnedArticle[0].authorId;
        next();
      } else {
        response
          .successResponse(res, constants.NOT_FOUND_CODE_MESSAGE, '', constants.NOT_FOUND_CODE);
      }
    } catch (error) {
      response.failureResponse(
        res,
        constants.SERVER_RETRIEVAL_MESSAGE,
        constants.SERVER_ERROR_CODE
      );
    }
  }

  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {*} object
   * @memberof ArticlesController
   */
  static async deleteArticle(req, res) {
    const { id } = req.params;
    try {
      const deletedArticle = await articleModelManager.deleteArticle(id);
      if (deletedArticle === 0) {
        response.failureResponse(res, constants.ARTICLES_DELETION_FAILURE);
      } else {
        response.successResponse(res, constants.ARTICLES_DELETION_SUCCESS, deletedArticle);
      }
    } catch (error) {
      response.failureResponse(
        res,
        constants.SERVER_RETRIEVAL_MESSAGE,
        constants.SERVER_ERROR_CODE
      );
    }
  }
}

module.exports = ArticlesController;
