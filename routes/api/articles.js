const router = require('express').Router();
const ArticlesController = require('../../controllers/Articles/articlesController');
const verify = require('../../middlewares/jwtValidator');
const articleValidator = require('../../middlewares/articleValidator');
const calculateReadTime = require('../../middlewares/calculateReadTime'),
  jwtValidator = require('../../middlewares/jwtValidator'),
  paramsValidator = require('../../lib/utils/paramsValidator'),
  commentValidator = require('../../lib/utils/commentValidator'),
  commentController = require('../../controllers/articlesCommentController'),
  emailNotification = require('../../middlewares/emailNotification');

/**
 * @swagger
 *
 * /create an article:
 *   post:
 *     description: To create an article on author's haven
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         description: The title of the article to be created
 *         in:  body
 *         required: true
 *         type: string
 *         format: string
 *       - name: description
 *         description: A short description of the article to be created
 *         in:  body
 *         required: true
 *         type: string
 *         format: string
 *       - name: content
 *         description: The main content of the article to be created
 *         in:  body
 *         required: true
 *         type: string
 *         format: string
 *       - name: featuredImageUrl
 *         description: The url of the main image of the article
 *         in:  body
 *         required: true
 *         type: string
 *         format: Url
 *       - name: slug
 *         description: A unique identifier for the article
 *         in:  body
 *         required: true
 *         type: string
 *         format: string
 *       - name: authorId
 *         description: The id of the author
 *         in:  body
 *         required: true
 *         type: string
 *         format: string
 *     responses:
 *        - 200:
 *          description: articles
 *          message: articles created succesfully
 *          Data: articles
 *        - 404:
 *          description: Server Error
 *          message: There as been a server error
 *
 *
 */
router.post('/', verify, articleValidator, calculateReadTime, ArticlesController.createArticles, emailNotification.notifyFollowers);

/**
 * @swagger
 *
 * /create an article:
 *   post:
 *     description: To update an article on author's haven
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         description: The updated title of the article to be created
 *         in:  body
 *         required: true
 *         type: string
 *         format: string
 *       - name: description
 *         description: A short update description of the article to be created
 *         in:  body
 *         required: true
 *         type: string
 *         format: string
 *       - name: content
 *         description: The update content of the article to be created
 *         in:  body
 *         required: true
 *         type: string
 *         format: string
 *       - name: featuredImageUrl
 *         description: The update url of the main image of the article
 *         in:  body
 *         required: true
 *         type: string
 *         format: Url
 *       - name: slug
 *         description: A update description of the article
 *         in:  body
 *         required: true
 *         type: string
 *         format: string
 *       - name: authorId
 *         description: The authorId
 *         in:  body
 *         required: true
 *         type: string
 *         format: string
 *     responses:
 *       - 200:
 *         description: articles
 *         message: articles updated succesfully
 *         Data: articles
 *       - 404:
 *         description: Server Error
 *         message: There as been a server error
 *       - 400:
 *         description: updated failed
 *         message: The update is unsuccessful
 *
 *
 */
router.put('/:id', verify, articleValidator, calculateReadTime, ArticlesController.updateArticle);

/**
 * @swagger
 *
 * /get an article:
 *   post:
 *     description: To get an article on author's haven
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: description
 *         description: A short update description of the article to be created
 *         in:  body
 *         required: true
 *         type: string
 *         format: string
 *       - name: content
 *         description: The update content of the article to be created
 *         in:  body
 *         required: true
 *         type: string
 *         format: string
 *       - name: featuredImageUrl
 *         description: The update url of the main image of the article
 *         in:  body
 *         required: true
 *         type: string
 *         format: Url
 *       - name: slug
 *         description: A update description of the article
 *         in:  body
 *         required: true
 *         type: string
 *         format: string
 *       - name: authorId
 *         description: The authorId
 *         in:  body
 *         required: true
 *         type: string
 *         format: string
 *     responses:
 *        - 200:
 *          description: articles
 *          message: articles retrieved succesfully
 *          Data: articles
 *        - 404:
 *          description: Server Error
 *          message: There as been a server error
 *
 *
 */
router.get('/', ArticlesController.getArticle);

/**
 * @swagger
 *
 * /delete:
 *   post:
 *     description: Deletes articles from the system
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: the id of the article to be deleted
 *         in:  body
 *         required: true
 *         type: string
 *     responses:
 *       - 200:
 *         description: Delete
 *         message: Delete Successful
 *       - 400:
 *         description: delete failed
 */
router.delete('/:id', ArticlesController.deleteArticle);

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
  '/:id/comments',
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
router.get('/:id/comments', commentController.findCommentController);
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
  '/:id/comments/:mainCommentId',
  paramsValidator,
  commentController.findCommentThreadController
);

module.exports = router;
