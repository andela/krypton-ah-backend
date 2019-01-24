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
   * @static
   * @returns { undefined } undefined
   * @param {*} req
   * @param {*} res
   */
  static async createArticles(req, res) {
    let authorId = req.decodedToken.payLoad;
    authorId = authorId.toString();
    const slug = generateSlug(req.body.title, authorId);
    const { body } = req;
    const userDetails = { ...slug.slugs, authorId, ...body };
    try {
      const createdArticles = await articleModelManager.createArticle(userDetails);
      generateTags(req.body.tags, createdArticles.dataValues.id);
      if (createdArticles) {
        response.successResponse(res, 'articles added successfully', createdArticles);
      }
    } catch (error) {
      response.failureResponse(
        res,
        constants.SERVER_RETRIEVAL_MESSAGE,
        constants.SERVER_ERROR_CODE,
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
    const { body } = req;
    const userDetails = { ...id, ...body };
    try {
      const updatedArticle = await articleModelManager.updateArticle(userDetails, req.params.id);
      if (updatedArticle[0] === 0) {
        response.failureResponse(res, 'update failed');
      } else {
        response.successResponse(res, constants.USER_RETRIEVAL_SUCCESS_MESSAGE, updatedArticle);
      }
    } catch (error) {
      response.failureResponse(
        res,
        constants.SERVER_RETRIEVAL_MESSAGE,
        constants.SERVER_ERROR_CODE,
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
  static async getArticle(req, res) {
    const { field, value } = req.params;
    try {
      const returnedArticle = await articleModelManager.getArticlesby(field, value);
      if (returnedArticle) {
        response.successResponse(res, 'articles retrieved succesfully', returnedArticle);
      }
    } catch (error) {
      response.failureResponse(
        res,
        constants.SERVER_RETRIEVAL_MESSAGE,
        constants.SERVER_ERROR_CODE,
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
        response.failureResponse(res, 'delete failed');
      } else {
        response.successResponse(res, constants.USER_RETRIEVAL_SUCCESS_MESSAGE, deletedArticle);
      }
    } catch (error) {
      response.failureResponse(
        res,
        constants.SERVER_RETRIEVAL_MESSAGE,
        constants.SERVER_ERROR_CODE,
      );
    }
  }
}

module.exports = ArticlesController;
