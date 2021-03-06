const {
  articleByAuthorWhere,
  articleByTagWhere,
  articleByTitleWhere,
  articleBykeywordWhere,
  articleByCategoryWhere,
  searchResult
} = require('../../lib/utils/helpers');
const { serverFailure } = require('../../lib/utils/messageHandler');
const articleModelManager = require('../../lib/modelManagers/articlemodel');
const categoryModelManager = require('../../lib/modelManagers/categoriesModel');
const response = require('../../lib/utils/helper_function');
const constants = require('../../constants');
const generateSlug = require('../../lib/utils/slugGenerator');
const generateTags = require('../../lib/utils/tagGenarator');
const paginate = require('../../lib/utils/pagination/paginationHelper');
const sort = require('../../lib/utils/sortArticlesHelper');

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
    const authorId = req.decodedToken.payLoad.id;
    const slug = generateSlug(req.body.title, authorId.toString());
    const articleDetails = {
      ...slug.slugs,
      authorId,
      ...req.body,
      category: req.body.category
        .toString()
        .toLowerCase()
        .trim()
    };
    try {
      const createdArticles = await articleModelManager.createArticle(articleDetails);
      await categoryModelManager.createCategory(createdArticles.category);
      generateTags(req.body.tags, createdArticles.id);
      if (createdArticles) {
        req.createdArticles = { ...createdArticles, authorId };
        req.createdArticles = createdArticles;
        return (response.successResponse(res, constants.OK_CODE, createdArticles), next());
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
    const { limit, offset } = req.query;
    const { field, value } = req.params;
    try {
      const returnedArticle = await articleModelManager.getArticlesby(field, value, limit, offset);
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
        response.successResponse(
          res,
          constants.NOT_FOUND_CODE_MESSAGE,
          '',
          constants.NOT_FOUND_CODE
        );
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
  static async getPopularArticles(req, res) {
    const { limit, offset } = req.query;
    try {
      const returnedArticles = await articleModelManager.filterPopularArticles(limit, offset);
      if (returnedArticles) {
        const sorted = sort(returnedArticles);
        return response.successResponse(res, constants.OK_CODE, sorted);
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

  /**
   * Search articles by title.
   * @param {object} req Request Object.
   * @param {object} res Response Object.
   * @returns {object} Response with the article details that matches the search criteria.
   */
  static async searchByTitle(req, res) {
    try {
      const { value } = req.query;
      const where = articleByTitleWhere(value);
      const { limit, offset } = paginate(req.query);
      const foundArticles = await articleModelManager.getArticlesByTitle(
        where,
        value,
        limit,
        offset
      );
      searchResult(foundArticles, res);
    } catch (error) {
      return serverFailure(res);
    }
  }

  /**
   * Search articles by Author.
   * @param {object} req Request Object.
   * @param {object} res Response Object.
   * @returns {object} Response with the article details that matches the search criteria.
   */
  static async searchByAuthor(req, res) {
    try {
      const { value } = req.query;
      const { limit, offset } = paginate(req.query);
      const where = articleByAuthorWhere(value);
      const foundArticles = await articleModelManager.getArticlesByAuthor(
        where,
        value,
        limit,
        offset
      );
      searchResult(foundArticles, res);
    } catch (error) {
      return serverFailure(res);
    }
  }

  /**
   * Search articles by Tag.
   * @param {object} req Request Object.
   * @param {object} res Response Object.
   * @returns {object} Response with the article details that matches the search criteria.
   */
  static async searchByTag(req, res) {
    try {
      const { value } = req.query;
      const { limit, offset } = paginate(req.query);
      const where = articleByTagWhere(value);
      const foundArticles = await articleModelManager.getArticlesByTag(where, value, limit, offset);
      searchResult(foundArticles, res);
    } catch (error) {
      return serverFailure(res);
    }
  }

  /**
   * Search articles by keyword.
   * @param {object} req Request Object.
   * @param {object} res Response Object.
   * @returns {object} Response with the article details that matches the search criteria.
   */
  static async searchByKeyword(req, res) {
    try {
      const { value } = req.query;
      const { limit, offset } = paginate(req.query);
      const where = articleBykeywordWhere(value);
      const foundArticles = await articleModelManager.getArticlesByKeyword(
        where,
        value,
        limit,
        offset
      );
      searchResult(foundArticles, res);
    } catch (error) {
      return serverFailure(res);
    }
  }

  /**
   * Search articles by keyword.
   * @param {object} req Request Object.
   * @param {object} res Response Object.
   * @returns {object} Response with the article details that matches the search criteria.
   */
  static async searchByCategory(req, res) {
    try {
      const { value } = req.query;
      const { limit, offset } = paginate(req.query);
      const where = articleByCategoryWhere(value);
      const foundArticles = await articleModelManager.getArticlesByKeyword(
        where,
        value,
        limit,
        offset
      );
      searchResult(foundArticles, res);
    } catch (error) {
      return serverFailure(res);
    }
  }
}

module.exports = ArticlesController;
