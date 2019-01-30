const router = require('express').Router(),
  bookmark = require('../../controllers/bookmarkController'),
  bookmarkValidator = require('../../middlewares/bookmarkValidate'),
  articleExist = require('../../middlewares/checkIfArticleExist'),
  jwtValidator = require('../../middlewares/jwtValidator');

router
/**
 * @swagger
 * /:
 *   post:
 *     description: Creates an article rating
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: articleId
 *         description: Article to be reviewed
 *         in:  body
 *         required: true
 *         type: string
 *         format: uuid
 *     responses:
 *       - 201:
 *         description: Article Bookmarked
 *       - 400:
 *         description: Validation error
 *         message: An array of error messages
 *       - 500:
 *         description: Database service error
 *         message: Ooops! Something went wrong, kindly try again
 */
  .post('/', bookmarkValidator, jwtValidator, articleExist, bookmark.bookmarkArticle)
  /**
 * @swagger
 * /:token:
 *   get:
 *     description: Get all article of a user bookmarked
 *     responses:
 *       200:
 *         description: Got users rating for a specific article
 *         message: Get user rating successfully
 *       404:
 *         description: One or both of articleId and reviewerId not found
 *         message: One or both of articleId and userId not found
 *       500:
 *         description: Database service error
 *         message: Ooops! Something went wrong, kindly try again
 */
  .get('/', jwtValidator, bookmark.getArticlesBookmarked)
  /**
 * @swagger
 * /:
 *   delete:
 *     description: Creates an article rating
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: articleId
 *         description: Article to be reviewed
 *         in:  body
 *         required: true
 *         type: string
 *         format: uuid
 *       - name: userId
 *         description: UserId of user that bookmark Article
 *         in:  body
 *         required: true
 *         type: string
 *         format: uuid
 *     responses:
 *       - 200:
 *         description: Article Deleted
 *       - 400:
 *         description: Validation error
 *         message: An array of error messages
 *       - 500:
 *         description: Database service error
 *         message: Ooops! Something went wrong, kindly try again
 */
  .delete('/', bookmarkValidator, jwtValidator, bookmark.deleteBookmark);

module.exports = router;
