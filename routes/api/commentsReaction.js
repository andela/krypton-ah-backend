const router = require('express').Router();
const { likeOrDislike, cancelReaction } = require('../../controllers/commentsReactionController');
const jwtValidator = require('../../middlewares/jwtValidator');
const { verifyCommentId, validateReaction } = require('../../middlewares/valueVerifier');
/**
 * @swagger
 *
 * /:commentId/:reaction:
 *    post:
 *     summary: React to a comment on an article
 *     description: React to a particular comment
 *     tags:
 *       - Comment reaction route
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
  likeOrDislike
);

router.delete('/reaction/:reactionId', jwtValidator, cancelReaction);
module.exports = router;
