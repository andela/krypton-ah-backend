const router = require('express').Router();
const {
  verifyCommentId,
  validateReaction,
  likeDislikeReset
} = require('../../controllers/commentsReactionController');
const jwtValidator = require('../../middlewares/jwtValidator');
/**
 * @swagger
 *
 * /:commentId/:reaction:
 *    post:
 *     description: Reac to a particular comment
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: commentId
 *         description: The id of an existing comment
 *         in:  request
 *       - name: reaction
 *         description: A like or a dislike
 *         in:  request
 *     responses:
 *       - 200:
 *         message: comment has been liked/disliked
 *       - 500:
 *         message: Internal server error
 *       - 404:
 *         message: comment not found
 *
 *
 */
router.post(
  '/:commentId/:reaction',
  jwtValidator,
  verifyCommentId,
  validateReaction,
  likeDislikeReset
);

module.exports = router;
