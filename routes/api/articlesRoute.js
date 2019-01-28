const router = require('express').Router(),
  jwtValidator = require('../../middlewares/jwtValidator'),
  paramsValidator = require('../../lib/utils/paramsValidator'),
  commentValidator = require('../../lib/utils/commentValidator'),
  commentController = require('../../controllers/articlesCommentController');

/**
 * @swagger
 * /:articleId/comments:
 * post:
 *     summary: Create Article Comment
 *     description: It allows users to create articles and comment under articles
 *     consumes:
 *       - "application/json"
 *       - "application/x-www-form-urlencoded"
 *     parameters:
 *       - in: query
 *         name: articleId
 *         description: articleId is the Id of the article that comments will be tied to
 *         type: integer
 *         required: true
 *       - in: jwt token
 *         name: userId
 *         description: id of the user making comment
 *         type: string
 *         required: true
 *       - in: body
 *         name: comment
 *         description: user's comment on article or other comment
 *         type: string
 *         required: true
 *       - in: body
 *         name: mainCommentId
 *         description: user's comment under other comment
 *         type: UUID
 *         required: false
 *     responses:
 *       200:
 *         description: Comment added successfully
 *       400:
 *         description: empty comment field
 */
router.post(
  '/:articleId/comments',
  commentValidator,
  jwtValidator,
  commentController.createCommentController
);

/**
 * @swagger
 * /:articleId/comments:
 * get:
 *     summary: Create Article Comment
 *     description: It allows users to create articles and comment under articles
 *     produces:
 *     - "application/json"
 *     parameters:
 *       - in: query
 *         name: articleId
 *         description: articleId is the Id of the article that comments will be tied to
 *         type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Comment successfully returned
 *       404:
 *         description: empty comment field
 */
router.get('/:articleId/comments', commentController.findCommentController);
/**
 * @swagger
 * /:articleId/comments/commentId:
 * get:
 *     summary: Create Article Comment
 *     description: It allows users to create articles and comment under articles
 *     produces:
 *       - "application/json"
 *     parameters:
 *       - in: query
 *         name: articleId
 *         description: articleId is the Id of the article that comments will be tied to
 *         type: integer
 *         required: true
 *       - in: query
 *         name: commentId
 *         description: commentId is the parent comments id that other comments are tied to
 *         type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Comment successfully returned
 *       404:
 *         description: empty comment field
 */
router.get(
  '/:articleId/comments/:mainCommentId',
  paramsValidator,
  commentController.findCommentThreadController
);

module.exports = router;
