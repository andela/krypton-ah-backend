const articleManager = require('../lib/modelManagers/articlemodel');
const { serverFailure, failureResponse } = require('../lib/utils/messageHandler'),
  {
    SERVER_ERROR_MESSAGE,
    NOT_FOUND_CODE,
    ARTICLE_NOT_FOUND
  } = require('../constants/index');

/**
   * Check if an article exists
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @param {function} next Next function calles next middleware
   * @returns {object} Error if article does not exist
   */
const checkIfArticleExists = async (req, res, next) => {
  try {
    const { articleId } = req.body;
    const dbResult = await articleManager.getArticlesby('id', articleId);
    if (dbResult.length > 0) return next();
    return failureResponse(res, ARTICLE_NOT_FOUND, NOT_FOUND_CODE);
  } catch (error) {
    return serverFailure(res, SERVER_ERROR_MESSAGE);
  }
};

module.exports = checkIfArticleExists;
