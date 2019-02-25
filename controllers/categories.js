const categoryModelManager = require('../lib/modelManagers/categoriesModel');
const articlesModelManager = require('../lib/modelManagers/articlemodel');
const response = require('../lib/utils/helper_function');
const constants = require('../constants');
const paginate = require('../lib/utils/pagination/paginationHelper');

/**
 *
 *
 * @class categoriesContoller
 */
class categoriesContoller {
  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {*} object
   * @memberof categoriesContoller
   */
  static async createCategory(req, res) {
    const { category } = req.body;
    try {
      const createdCategory = await categoryModelManager.createCategory(category);
      if (createdCategory[1] === false) {
        return (response.successResponse(res,
          constants.CONFLICT_CODE,
          constants.CATEGORY_CONFLICT));
      }
      return (response.successResponse(res, constants.OK_CODE, createdCategory));
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
 * @memberof categoriesContoller
 */
  static async getCategories(req, res) {
    const { category } = req.params;
    const { limit, offset } = paginate(req.query);
    try {
      const returnedCategories = await categoryModelManager.getCategory(category, limit, offset);
      if (returnedCategories) {
        return (response.successResponse(res, constants.OK_CODE, returnedCategories));
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
 * @memberof categoriesContoller
 */
  static async deleteCategories(req, res) {
    const { category } = req.params;
    try {
      const ArticlesUsingCategories = articlesModelManager.getArticlesByCategory(category);
      if (!ArticlesUsingCategories) {
        const deletedCategory = await (categoryModelManager.deleteCategory(category));
        if (deletedCategory) {
          return (response.successResponse(res, constants.OK_CODE, deletedCategory));
        }
      }
      return (response.failureResponse(res, constants.CATEGORY_IN_USE));
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
 * @memberof categoriesContoller
 */
  static async getAllCategories(req, res) {
    const { limit, offset } = paginate(req.query);
    try {
      const returnedCategories = await categoryModelManager.getAllCategories(limit, offset);
      if (returnedCategories) {
        returnedCategories.sort((a, b) => ((a.Articles.length < b.Articles.length) ? 1 : -1));
        return (response.successResponse(res, constants.OK_CODE, returnedCategories));
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


module.exports = categoriesContoller;
