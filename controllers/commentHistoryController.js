const commentHistory = require('../lib/modelManagers/commentsHistoryModel'),
  { successResponse, serverFailure } = require('../lib/utils/messageHandler'),
  {
    OK_CODE,
    SERVER_ERROR_MESSAGE,
    HISTORY_RETRIEVED,
  } = require('../constants');

/**
 * @description Gets comment history under a specific article Controller
 * @param {*} req
 * @param {*} res
 * @returns {*} *
 */
async function getArticleCommentsModified(req, res) {
  const { articleId } = req.params;
  try {
    const history = await commentHistory.getModifiedComments('articleId', articleId);
    successResponse(res, HISTORY_RETRIEVED, OK_CODE, history);
  } catch (error) {
    return serverFailure(res, SERVER_ERROR_MESSAGE);
  }
}

/**
 * @description Gets thread history under a spicific comment Controller
 * @param {*} req
 * @param {*} res
 * @returns {*} *
 */
async function getThreadsModified(req, res) {
  const { commentId } = req.params;
  try {
    const history = await commentHistory.getModifiedComments('mainCommentId', commentId);
    successResponse(res, HISTORY_RETRIEVED, OK_CODE, history);
  } catch (error) {
    return serverFailure(res, SERVER_ERROR_MESSAGE);
  }
}

module.exports = {
  getArticleCommentsModified,
  getThreadsModified
};
