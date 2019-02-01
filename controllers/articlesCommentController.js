const Comment = require('../lib/modelManagers/articlesComment'),
  commentHistory = require('../lib/modelManagers/commentsHistoryModel'),
  { successResponse, serverFailure, failureResponse } = require('../lib/utils/messageHandler'),
  {
    COMMENT_CREATED,
    RESOURCE_CREATED_CODE,
    OK_CODE,
    COMMENT_SUCCESS_RETURN_MESSAGE,
    SERVER_ERROR_CODE,
    SERVER_ERROR_MESSAGE,
    COMMENT_NOT_FOUND,
    NOT_FOUND_CODE,
    COMMENT_UPDATED,
    HISTORY_RETRIEVED,
    HISTORY_NOT_FOUND
  } = require('../constants'),
  pagination = require('../lib//utils/pagination/paginationHelper');

/**
 *
 * @description create Articles Comment Controller
 * @param {*} req
 * @param {*} res
 * @returns {*} *
 */
async function createCommentController(req, res) {
  try {
    const userId = req.decodedToken.payLoad;
    const { comment, mainCommentId } = req.body;
    const { id } = req.params;
    const comments = await Comment.createComment({
      comment,
      userId,
      articleId: id,
      mainCommentId
    });
    return successResponse(res, COMMENT_CREATED, RESOURCE_CREATED_CODE, comments);
  } catch (error) {
    return failureResponse(res, error, SERVER_ERROR_CODE);
  }
}

/**
 *
 * @description create Articles Comment Controller
 * @param {*} req
 * @param {*} res
 * @returns {*} *
 */
async function findCommentController(req, res) {
  try {
    const { id } = req.params;
    const { limit, page } = req.query;
    const query = { offset: page, limit };
    const paginate = pagination(query);
    const comments = await Comment.findAllComment(id, paginate.limit, paginate.offset);
    if (!comments[0]) {
      return failureResponse(res, COMMENT_NOT_FOUND, NOT_FOUND_CODE);
    }
    const comment = comments.map((thread) => {
      thread.dataValues.threads = thread.threads.length;
      return thread;
    });
    return successResponse(res, COMMENT_SUCCESS_RETURN_MESSAGE, OK_CODE, comment);
  } catch (error) {
    return failureResponse(res, error, SERVER_ERROR_CODE);
  }
}

/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @returns {*} *
 */
async function findCommentThreadController(req, res) {
  try {
    const { id, mainCommentId } = req.params;
    const { limit, page } = req.query;
    const query = { offset: page, limit };
    const paginate = pagination(query);
    const commentThread = await Comment.findCommentThreads(
      id,
      mainCommentId,
      paginate.limit,
      paginate.offset
    );
    if (!commentThread) {
      return failureResponse(res, COMMENT_NOT_FOUND, NOT_FOUND_CODE);
    }
    return successResponse(res, COMMENT_SUCCESS_RETURN_MESSAGE, OK_CODE, commentThread);
  } catch (error) {
    return failureResponse(res, SERVER_ERROR_MESSAGE, SERVER_ERROR_CODE);
  }
}


/**
 *
 * @description update Article Comment Controller
 * @param {*} req
 * @param {*} res
 * @returns {*} *
 */
async function updateCommentController(req, res) {
  try {
    const userId = req.decodedToken.payLoad;
    const { commentId, comment } = req.body;
    const { articleId } = req.params;
    const commenter = await Comment.findComment(articleId, commentId);
    await Comment.updateArticleComment({ updated: true }, commentId);
    const createComment = await Comment.createComment({
      comment,
      userId,
      articleId,
      mainCommentId: commenter.mainCommentId,
      createdAt: commenter.createdAt
    });
    if (!commenter.mainCommentId) {
      await Comment.updateAllCommentThreads({
        mainCommentId: createComment.id
      }, commentId);
    }
    return successResponse(res, COMMENT_UPDATED, RESOURCE_CREATED_CODE, createComment);
  } catch (error) {
    return serverFailure(res, SERVER_ERROR_MESSAGE);
  }
}

/**
 * @description Gets all comment history Controller
 * @param {*} req
 * @param {*} res
 * @returns {*} *
 */
async function getAllHistory(req, res) {
  try {
    const history = await commentHistory.getAllHistory();
    const commentCount = history.count,
      comments = history.rows;
    const result = { commentCount, comments };
    successResponse(res, HISTORY_RETRIEVED, OK_CODE, result);
  } catch (error) {
    return serverFailure(res, SERVER_ERROR_MESSAGE);
  }
}

/**
 * @description Gets comment history under a specific article Controller
 * @param {*} req
 * @param {*} res
 * @returns {*} *
 */
async function getArticlesHistory(req, res) {
  const { articleId } = req.params;
  try {
    const history = await commentHistory.getHistory('articleId', articleId);
    if (!history) {
      return failureResponse(res, HISTORY_NOT_FOUND, NOT_FOUND_CODE);
    }
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
async function getThreadsHistory(req, res) {
  const { commentId } = req.params;
  try {
    const history = await commentHistory.getHistory('mainCommentId', commentId);
    if (!history) {
      return failureResponse(res, HISTORY_NOT_FOUND, NOT_FOUND_CODE);
    }
    successResponse(res, HISTORY_RETRIEVED, OK_CODE, history);
  } catch (error) {
    return serverFailure(res, SERVER_ERROR_MESSAGE);
  }
}

module.exports = {
  createCommentController,
  updateCommentController,
  findCommentController,
  findCommentThreadController,
  getAllHistory,
  getArticlesHistory,
  getThreadsHistory
};
