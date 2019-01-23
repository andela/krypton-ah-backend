const router = require('express').Router(),
  articleRating = require('../../controllers/articleRatingController'),
  ratingValidator = require('../../middlewares/ratingValidator');

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
 *       - name: reviewerId
 *         description: UserId of user to review specific Article
 *         in:  body
 *         required: true
 *         type: string
 *         format: uuid
 *       - name: rating
 *         description: Uaers rating for a specific article
 *         in:  body
 *         required: true
 *         type: number
 *         format: integer
 *     responses:
 *       - 201:
 *         description: User rating created
 *         message: Your rating have been saved succesfully
 *       - 400:
 *         description: Validation error
 *         message: An array of error messages
 *       - 500:
 *         description: Database service error
 *         message: Ooops! Something went wrong, kindly try again
 */
  .post('/', ratingValidator, articleRating.createRating)

/**
 * @swagger
 * /:token:
 *   get:
 *     description: Get rating of a user for a specific article
 *     parameters:
 *       - name: articleId
 *         description: Article to search for
 *         in:  params
 *         required: true
 *         type: string
 *         format: uuid
 *       - name: reviewerId
 *         description: User to search for
 *         in:  params
 *         required: true
 *         type: string
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
  .get('/:reviewerId/:articleId', articleRating.getUserRating);

module.exports = router;
