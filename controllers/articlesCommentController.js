const Comment = require('../lib/modelManagers/articlesComment'),
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
    COMMENT_DELETED,
    UNAUTHORIZED_CODE,
    UNAUTHORIZED_REQUEST
  } = require('../constants'),
  pagination = require('../lib//utils/pagination/paginationHelper'),
  {
    getOriginalId,
    updateMainCommentId
  } = require('../lib//utils/articleCommentHelper');

/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {*} *
 */
async function createCommentController(req, res, next) {
  try {
    const { comment, mainCommentId } = req.body;
    const userId = req.decodedToken.payLoad.id;
    const { id } = req.params;
    const comments = await Comment.createComment({
      comment,
      userId,
      articleId: id,
      mainCommentId
    });
    successResponse(res, COMMENT_CREATED, RESOURCE_CREATED_CODE, comments);
    const { articleId } = comments.dataValues;
    req.commentDetails = {
      id,
      comment,
      mainCommentId,
      userId,
      articleId
    };
    req.body.commentId = comments.id;
    req.body.articleId = id;
    return next();
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
    const userId = req.decodedToken.payLoad.id;
    const { commentId, comment } = req.body;
    const { articleId } = req.params;
    const commentDetails = await Comment.findComment(articleId, commentId);
    if (userId !== commentDetails.userId) {
      return failureResponse(res, UNAUTHORIZED_REQUEST, UNAUTHORIZED_CODE);
    }
    const originalId = getOriginalId(commentDetails);
    await Comment.updateArticleComment({ updated: true }, commentId);
    const newComment = await Comment.createComment({
      comment,
      userId,
      articleId,
      originalId,
      mainCommentId: commentDetails.mainCommentId,
      originalDate: commentDetails.createdAt
    });
    updateMainCommentId(commentDetails, newComment, commentId);
    return successResponse(res, COMMENT_UPDATED, OK_CODE, newComment);
  } catch (error) {
    return serverFailure(res, SERVER_ERROR_MESSAGE);
  }
}

/**
 *
 * @description update Article Comment Controller
 * @param {*} req
 * @param {*} res
 * @returns {*} *
 */
async function deleteCommentController(req, res) {
  try {
    const userId = req.decodedToken.payLoad.id;
    const { commentId } = req.body;
    const { articleId } = req.params;
    const commentDetails = await Comment.findComment(articleId, commentId);
    if (userId !== commentDetails.userId) {
      return failureResponse(res, UNAUTHORIZED_REQUEST, UNAUTHORIZED_CODE);
    }
    const originalId = getOriginalId(commentDetails);
    await Comment.updateArticleComment({ deleted: true }, commentId);
    const newComment = await Comment.createComment({
      comment: '',
      userId,
      articleId,
      originalId,
      mainCommentId: commentDetails.mainCommentId,
      originalDate: commentDetails.createdAt
    });
    updateMainCommentId(commentDetails, newComment, commentId);
    return successResponse(res, COMMENT_DELETED, OK_CODE);
  } catch (error) {
    return serverFailure(res, SERVER_ERROR_MESSAGE);
  }
}

module.exports = {
  createCommentController,
  findCommentController,
  findCommentThreadController,
  updateCommentController,
  deleteCommentController
};
