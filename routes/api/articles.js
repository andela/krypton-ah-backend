const router = require('express').Router();
const ArticlesController = require('../../controllers/Articles/articlesController');
const verify = require('../../middlewares/jwtValidator');
const articleValidator = require('../../middlewares/articleValidator');
const calculateReadTime = require('../../middlewares/calculateReadTime'),
  jwtValidator = require('../../middlewares/jwtValidator'),
  paramsValidator = require('../../middlewares/paramsValidator'),
  commentValidator = require('../../lib/utils/commentValidator'),
  commentController = require('../../controllers/articlesCommentController'),
  emailNotification = require('../../middlewares/emailNotification'),
  { verifyArticleId, validateReaction } = require('../../middlewares/valueVerifier'),
  partialJwtValidator = require('../../middlewares/partialJwtValidator'),
  getArticleValidator = require('../../middlewares/getArticleValidator'),
  updateReadStat = require('../../middlewares/updateReadStat'),
  ReportController = require('../../controllers/reportController'),
  uuidValidator = require('../../middlewares/uuidValidator'),
  articlesHighlightValidator = require('../../middlewares/articlesHighlightValidator'),
  createArticleHighlight = require('../../middlewares/createArticleHighlight'),
  commentHistoryController = require('../../controllers/commentHistoryController');
const {
  likeOrDislike,
  cancelReaction,
  allReactions
} = require('../../controllers/articlesReactionController');

/**
  * @swagger
  * /search?query parameters:
  * get:
  *     summary: Search articles by keyword
  *     description: users can search for an article by keywords
  *     tags:
  *       - Article routes
  *     produces:
  *       - "application/json"
  *     parameters:
  *       - in: query
  *         name: value
  *         description: value is the search query parameter the user pass in to search by
  *         type: string
  *         required: true
  *     responses:
  *       200:
  *         description: Below are the matching articles
  *       404:
  *         description: No article with the search parameter
  *       500:
  *          description: Ooops! Something went wrong, kindly try again
  */
router.get('/search', ArticlesController.searchByKeyword);


/**
  * @swagger
  * /search?query parameters:
  * get:
  *     summary: Search articles by keyword
  *     description: users can search for an article by keywords
  *     tags:
  *       - Article routes
  *     produces:
  *       - "application/json"
  *     parameters:
  *       - in: query
  *         name: value
  *         description: value is the search query parameter the user pass in to search by
  *         type: string
  *         required: true
  *     responses:
  *       200:
  *         description: Below are the matching articles
  *       404:
  *         description: No article with the search parameter
  *       500:
  *          description: Ooops! Something went wrong, kindly try again
  */
router.get('/popular', ArticlesController.getPopularArticles);

/**
 * @swagger
 * /search/title?query parameters:
 * get:
 *     summary: Search articles by title
 *     description: users can search for an article through the article title
  *     tags:
  *       - Article routes
 *     produces:
 *       - "application/json"
 *     parameters:
 *       - in: query
 *         name: value
 *         description: value is the search query parameter the user pass in to search by
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Below are the matching articles
 *       404:
 *         description: No article with the search parameter
 *       500:
 *          description: Ooops! Something went wrong, kindly try again
 */
router.get('/search/category/', ArticlesController.searchByCategory);

/**
 * @swagger
 * /search/title?query parameters:
 * get:
 *     summary: Search articles by title
 *     description: users can search for an article through the article title
  *     tags:
  *       - Article routes
 *     produces:
 *       - "application/json"
 *     parameters:
 *       - in: query
 *         name: value
 *         description: value is the search query parameter the user pass in to search by
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Below are the matching articles
 *       404:
 *         description: No article with the search parameter
 *       500:
 *          description: Ooops! Something went wrong, kindly try again
 */
router.get('/search/title/', ArticlesController.searchByTitle);

/**
 * @swagger
 * /search/author?query parameters:
 * get:
 *     summary: search articles by author
 *     description: users can search for an article through the article author
  *     tags:
  *       - Article routes
 *     produces:
 *       - "application/json"
 *     parameters:
 *       - in: query
 *         name: value
 *         description: value is the search query parameter the user pass in to search by
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Below are the matching articles
 *       404:
 *         description: No article with the search parameter
 *       500:
 *          description: Ooops! Something went wrong, kindly try again
 */
router.get('/search/author/', ArticlesController.searchByAuthor);

/**
 * @swagger
 * /search/tag?query parameters:
 * get:
 *     summary: search articles by tag
 *     description: users can search for an article through the article tag
  *     tags:
  *       - Article routes
 *     produces:
 *       - "application/json"
 *     parameters:
 *       - in: query
 *         name: value
 *         description: value is the search query parameter the user pass in to search by
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Below are the matching articles
 *       404:
 *         description: No article with the search parameter
 *       500:
 *          description: Ooops! Something went wrong, kindly try again
 */
router.get('/search/tag/', ArticlesController.searchByTag);

/**
 * @swagger
 *
 * /create an article:
 *   post:
 *     summary: Create a new article
 *     description: To create an article on author's haven
 *     tags:
 *       - Article routes
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
router.post(
  '/',
  verify,
  articleValidator,
  calculateReadTime,
  ArticlesController.createArticles,
  emailNotification.notifyFollowers
);

/**
 * @swagger
 *
 * /id:
 *   put:
 *     summary: Update an article
 *     description: To update an article on author's haven
 *     tags:
 *       - Article routes
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
 * /reports:
 *   get:
 *     summary: Get all reports
 *     description: To get all reports
 *     tags:
 *       - Article routes
 *     produces:
 *       - application/json
 *     responses:
 *        - 200:
 *          description: report
 *          message: Report retrieved successfully.
 *          Data: reports
 *        - 500:
 *          description: Server Error
 *          message: There as been a server error
 *
 *
 */
router.get('/reports', jwtValidator, ReportController.getReports);

/**
 * @swagger
 *
 * /:id/report:
 *   put:
 *     summary: Update report status
 *     description: resolved a report
 *     tags:
 *        - Article routes
 *     produces:
 *       - application/json
 *     responses:
 *        - 200:
 *          description: resolve report
 *          message: You have successfully resolve this report.
 *          Data: id
 *        - 500:
 *          description: Server Error
 *          message: There as been a server error
 *
 *
 */
router.put('/:id/report', jwtValidator, ReportController.resolveReport);

/**
 * @swagger
 *
 * /:id:
 *   get:
 *     summary: Get a single article
 *     description: To get an article on author's haven
 *     tags:
 *       - Article routes
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
router
  .route('/:id')
  .get(partialJwtValidator, getArticleValidator, ArticlesController.getArticle, updateReadStat);

/**
 * @swagger
 *
 * /:
 *   get:
 *     summary: Get all articles
 *     description: To get an article on author's haven
 *     tags:
 *       - Article routes
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
router.get('/', ArticlesController.getArticles);

/**
 * @swagger
 *
 * /:id:
 *   delete:
 *     summary: Delete an article
 *     description: Deletes articles from the system
 *     tags:
 *       - Article routes
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
 *  post:
 *     summary: Create Article Comment
 *     description: It allows users to create articles and comment under articles
 *     tags:
 *       - Article routes
 *     consumes:
 *       - "application/json"
 *       - "application/x-www-form-urlencoded"
 *     parameters:
 *       - in: query
 *         name: id
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
 *         type: string
 *         required: false
 *     responses:
 *       -  200:
 *          description: Comment added successfully
 *       -  400:
 *          description: empty comment field
 */
router.post(
  '/:id/comments',
  jwtValidator,
  commentValidator,
  articlesHighlightValidator,
  commentController.createCommentController,
  createArticleHighlight,
  emailNotification.CommentNotification
);

/**
 * @swagger
 * /:articleId/comments:
 *  get:
 *     summary: Get Article Comment
 *     description: It allows users to get articles and comment under articles
 *     tags:
 *       - Article routes
 *     produces:
 *       - "application/json"
 *     parameters:
 *       - in: query
 *         name: id
 *         description: articleId is the Id of the article that comments will be tied to
 *         type: integer
 *         required: true
 *     responses:
 *       -  200:
 *          description: Comment successfully returned
 *       -  404:
 *          description: empty comment field
 */
router.get('/:id/comments', paramsValidator, commentController.findCommentController);
/**
 * @swagger
 * /:articleId/comments/commentId:
 *  get:
 *     summary: Create Article Comment
 *     description: It allows users to create articles and comment under articles
 *     tags:
 *       - Article routes
 *     produces:
 *       - "application/json"
 *     parameters:
 *       - in: query
 *         name: id
 *         description: articleId is the Id of the article that comments will be tied to
 *         type: integer
 *         required: true
 *       - in: query
 *         name: commentId
 *         description: commentId is the parent comments id that other comments are tied to
 *         type: integer
 *         required: true
 *     responses:
 *       - 200:
 *         description: Comment successfully returned
 *       - 404:
 *         description: empty comment field
 */
router.get(
  '/:id/comments/:mainCommentId',
  paramsValidator,
  commentController.findCommentThreadController
);

/**
 * @swagger
 *
 * /:articleId/:reaction:
 *   put:
 *     summary: React to an article
 *     description: React to a particular article
 *     tags:
 *       - Article routes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: articleId
 *         description: The id of an existing article
 *         in:  request
 *       - name: reaction
 *         description: A like or a dislike
 *         in:  query
 *     responses:
 *       - 200:
 *         message: article has been liked/disliked
 *       - 400:
 *         message: Value must be a UUID OR Try using 'like' or 'dislike'
 *       - 404:
 *         message: article not found
 *
 *
 */
router.put('/reaction/:articleId/', jwtValidator, verifyArticleId, validateReaction, likeOrDislike);

/*
 * /update comment:
 *   put:
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: commentId
 *         description: The id of comment to be updated
 *         in:  body
 *         required: true
 *         type: string
 *         format: uuid
 *       - name: comment
 *         description: The new comment
 *         in:  body
 *         required: true
 *         type: string
 *         format: string
 *     responses:
 *       - 200:
 *         description: articles
 *         message: Comment updated succesfully
 *         Data: Updated comment details
 *       - 500:
 *         description: Server Error
 *         message: There as been a server error
 */
router.put('/:articleId/comments/', jwtValidator, commentController.updateCommentController);


/**
 * @swagger
 *
 * /:articleId/report:
 *   post:
 *     summary: Report an article
 *     description: To report an article
 *     tags:
 *       - Article routes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: report Tag
 *         description: The purpose of the report
 *         in:  body
 *         required: true
 *         type: string
 *         format: string
 *       - name: message
 *         description: The content of the report
 *         in:  body
 *         required: true
 *         type: string
 *         format: TEXT
 *     responses:
 *        - 200:
 *          description: Report
 *          message: Report was successfully created. Thank you.
 *          Data: Null
 *        - 500:
 *          description: Server Error
 *          message: There as been a server error
 */
router.post('/:articleId/report', jwtValidator, ReportController.createAReport);

/**
 * @swagger
 *
 * /:articleId/:reaction:
 *   get:
 *     summary: Get number of likes and dislike for an article
 *     description: Get number of likes and dislikes for an article
 *     tags:
 *       - Article routes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: articleId
 *         description: The id of an existing article
 *         in:  request
 *     responses:
 *       - 200:
 *         message: Total number of reactions
 *         data: {likes:number of likes , dislikes:number of dislikes}
 *       - 400:
 *         message: Value must be a UUID
 *       - 404:
 *         message: Article does not exist
 *
 *
 */
router.get('/reaction/:articleId/reactions', verifyArticleId, allReactions);
/**
 * @swagger
 *
 * /:id/report:
 *   get:
 *     summary: Get a single report
 *     description: To single report
 *     tags:
 *       - Article routes
 *     produces:
 *       - application/json
 *     responses:
 *        - 200:
 *          description: report
 *          message: Report retrieved successfully.
 *          Data: report
 *        - 500:
 *          description: Server Error
 *          message: There as been a server error
 *
 *
 */
router.get('/:id/report', jwtValidator, uuidValidator, ReportController.getReport);

/**
 * @swagger
 *
 * /:articleId/:reaction:
 *   delete:
 *     summary: Delete a reaction
 *     description: Delete an existing reaction to an article
 *     tags:
 *       - Article routes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: reactionId
 *         description: The id of an existing reaction
 *         in:  request
 *     responses:
 *       - 200:
 *         message: Reaction removed successfully
 *       - 400:
 *         message: Value must be a UUID
 *       - 404:
 *         message: Invalid reaction Id
 *
 *
 */
router.delete('/reaction/:reactionId', jwtValidator, cancelReaction);

/*
 *  delete:
 *     description: Soft delete comment
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: commentId
 *         description: the id of the comment to be deleted
 *         in:  body
 *         required: true
 *         type: string
 *     responses:
 *       - 200:
 *         description: Delete
 *         message: Comment deleted Successfully
 *       - 500:
 *         description: Server Error
 */
router.delete('/:articleId/comments/', jwtValidator, commentController.deleteCommentController);

/**
 * @swagger
 *   get:
 *     description: Get all modified comments in an article
 *     produces:
 *       - "application/json"
 *     parameters:
 *       - in: params
 *         name: articleId
 *         description: Id of article whose comments modified is to be retrieved
 *         type: string
 *         format: uuid
 *         required: true
 *     responses:
 *       200:
 *         message: Retrieved successfully
 *       500:
 *         description: Database service error
 *         message: Ooops! Something went wrong, kindly try again
 */
router.get('/:articleId/modified/comments/', jwtValidator, commentHistoryController.getArticleCommentsModified);

/**
 * @swagger
 *   get:
 *     description: Get all modified threads in a comment
 *     produces:
 *       - "application/json"
 *     parameters:
 *       - in: params
 *         name: articleId
 *         description: Id of article whose comment change history is to be retrieved
 *         type: string
 *         format: uuid
 *         required: true
 *       - in: params
 *         name: commentId
 *         description: Id of comment to get threads chenges from article
 *         type: string
 *         format: uuid
 *         required: true
 *     responses:
 *       200:
 *         message: Retrieved successfully
 *       500:
 *         description: Database service error
 *         message: Ooops! Something went wrong, kindly try again
 */
router.get('/:articleId/comments/:commentId/modified/', jwtValidator, commentHistoryController.getThreadsModified);

module.exports = router;
