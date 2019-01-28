const Comment = require('../lib/modelManagers/articlesComment'),
  {
    COMMENT_CREATED,
    RESOURCE_CREATED_CODE,
    OK_CODE,
    COMMENT_SUCCESS_RETURN_MESSAGE,
    SERVER_ERROR_CODE,
    SERVER_ERROR_MESSAGE,
    COMMENT_NOT_FOUND,
    NOT_FOUND_CODE,
    COMMENT_LIMIT
  } = require('../constants'),
  pagination = require('../lib//utils/pagination/paginationHelper'),
  { successResponse, failureResponse } = require('../lib/utils/messageHandler');

/**
 *
 * @description create Articles Comment Controller
 * @param {*} req
 * @param {*} res
 * @returns {*} *
 */
async function createCommentController(req, res) {
  try {
    const { comment, userId, mainCommentId } = req.body;
    const { articleId } = req.params;
    const comments = await Comment.createComment(comment, userId, articleId, mainCommentId);
    return successResponse(res, COMMENT_CREATED, RESOURCE_CREATED_CODE, comments);
  } catch (error) {
    return failureResponse(res, SERVER_ERROR_MESSAGE, SERVER_ERROR_CODE);
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
    const { articleId } = req.params;
    let { page } = req.query;
    if (!page) {
      page = 1;
    }
    const query = { offset: page / page, limit: COMMENT_LIMIT * page };
    const paginate = pagination(query);
    const comments = await Comment.findAllComment(articleId, paginate.limit, paginate.offset);
    if (!comments[0]) {
      return failureResponse(res, COMMENT_NOT_FOUND, NOT_FOUND_CODE);
    }
    const comment = comments.map((thread) => {
      thread.dataValues.threads = thread.threads.length;
      return thread;
    });
    return successResponse(res, COMMENT_SUCCESS_RETURN_MESSAGE, OK_CODE, comment);
  } catch (error) {
    return failureResponse(res, SERVER_ERROR_MESSAGE, SERVER_ERROR_CODE);
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
    const { articleId, mainCommentId } = req.params;
    let { page } = req.query;
    if (!page) {
      page = 1;
    }
    const query = { offset: page / page, limit: COMMENT_LIMIT * page };
    const paginate = pagination(query);
    const commentThread = await Comment.findCommentThreads(
      articleId,
      mainCommentId,
      paginate.limit,
      paginate.offset
    );
    if (!commentThread) {
      return failureResponse(res, COMMENT_NOT_FOUND, NOT_FOUND_CODE);
    }
    console.log('commentThread--->>>', commentThread);
    console.log('articleId--->>>', articleId);
    console.log('mainCommentId--->>>', mainCommentId);
    return successResponse(res, COMMENT_SUCCESS_RETURN_MESSAGE, OK_CODE, commentThread);
  } catch (error) {
    return failureResponse(res, SERVER_ERROR_MESSAGE, SERVER_ERROR_CODE);
  }
}

module.exports = {
  createCommentController,
  findCommentController,
  findCommentThreadController
};
