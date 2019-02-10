const router = require('express').Router();
const Users = require('../../controllers/Users/userController'),
  FollowUsersController = require('../../controllers/FollowController'),
  jwtValidator = require('../../middlewares/jwtValidator'),
  resendMail = require('../../controllers/resendVerificationMailController'),
  verifyNewUser = require('../../controllers/verificationEmailController'),
  { getUserReadStatController } = require('../../controllers/readStatsController'),
  emailNotification = require('../../middlewares/emailNotification');

/**
 * @swagger
 * /list:
 *   get:
 *     summary: List all the users present in the system
 *     description: Returns a list of all the users along with their profiels
 *     tags:
 *       - User routes
 *     parameters:
 *       - in: query
 *         name: offset
 *         type: integer
 *         required: false
 *         enum:
 *           - yes
 *           - no
 *       - name: limit
 *         type: integer
 *         required: false
 *         enum:
 *           - yes
 *           - no
 *     responses:
 *       200:
 *         description: List of users
 *         schema:
 *           type: object
 *           properties:
 *             users:
 *               type: array
 *               description: all the users
 *               items:
 *                 type: array
 *       400:
 *         description: No user returned
 *         schema:
 *           type: object
 *           properties:
 *             users:
 *               type: array
 *               description: no user returned
 *               items:
 *                 type: array
 */
router.get('/', Users.listUsers);

/**
 * @swagger
 * /:id/follow:
 *   post:
 *     summary: Follow a user
 *     description: It allows an authorized user to follow another author
 *     tags:
 *       - User routes
 *     parameters:
 *       - in: query
 *         name: offset
 *         type: integer
 *         required: false
 *         enum:
 *           - yes
 *           - no
 *       - name: limit
 *         type: integer
 *         required: false
 *         enum:
 *           - yes
 *           - no
 *     responses:
 *       200:
 *         description: Successfully followed an author
 *         schema:
 *           type: strig
 *           properties:
 *             users:
 *               type: string
 *               description: flag a success message
 *               items:
 *                 type: string
 *       400:
 *         description: Invalid user
 *         schema:
 *           type: object
 *           properties:
 *             users:
 *               type: string
 *               description: no author returned
 *               items:
 *                 type: string
 */
router.post(
  '/:id/follow',
  jwtValidator,
  FollowUsersController.follow,
  emailNotification.followNotification
);

/**
 * @swagger
 * /:id/unfollow:
 *   delete:
 *     summary: Unfollow a user
 *     description: It enables author to unfollow each other
 *     tags:
 *       - User routes
 *     parameters:
 *       - in: query
 *         name: offset
 *         type: integer
 *         required: false
 *         enum:
 *           - yes
 *           - no
 *       - name: no limit
 *         type: integer
 *         required: follower and followee Id
 *         enum:
 *           - yes
 *           - no
 *     responses:
 *       200:
 *         description: Successfully followed an author
 *         schema:
 *           type: strig
 *           properties:
 *             users:
 *               type: string
 *               description: flag a success message
 *               items:
 *                 type: string
 *       404:
 *         description: Invalid user
 *         schema:
 *           type: object
 *           properties:
 *             users:
 *               type: string
 *               description: no author returned
 *               items:
 *                 type: string
 */
router.delete(
  '/:id/unfollow',
  jwtValidator,
  FollowUsersController.unfollow
);

/**
 * @swagger
 * /followees/?id=:
 *   get:
 *     summary: Get all followers
 *     description: Get the user followers
 *     tags:
 *       - User routes
 *     parameters:
 *       - in: query
 *         name: offset
 *         type: integer
 *         required: false
 *         enum:
 *           - yes
 *           - no
 *       - name: limit
 *         type: integer
 *         required: false
 *         enum:
 *           - yes
 *           - no
 *     responses:
 *       200:
 *         description: Successfully fetch user followees
 *         schema:
 *           type: object
 *           properties:
 *             users:
 *               type: string
 *               description:
 *               items:
 *                 type: string
 */
router.get(
  '/followers',
  FollowUsersController.followers
);
/**
 * @swagger
 * following:
 *   get:
 *     summary: Get all user followees
 *     description: Display all the users that the current user is following
 *     tags:
 *       - User routes
 *     parameters:
 *       - in: query
 *         name: offset
 *         type: integer
 *         required: false
 *         enum:
 *           - yes
 *           - no
 *       - name: limit
 *         type: integer
 *         required: false
 *         enum:
 *           - yes
 *           - no
 *     responses:
 *       200:
 *         description: Successfully fetch user followees
 *         schema:
 *           type: object
 *           properties:
 *             users:
 *               type: string
 *               description:
 *               items:
 *                 type: string
 */
router.get(
  '/following',
  FollowUsersController.following
);

/**
 * @swagger
 *
 * /resend:
 *   post:
 *     summary: Resend account verification link
 *     description: resend new account activation link
 *     tags:
 *       - User routes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: user email to resend the activation link to
 *         in:  body
 *         required: true
 *         type: string
 *         format: email
 *     responses:
 *       - 200:
 *         description: resend new account activation link
 *         message: Activation link has been sent to your mail, kindly activate your account 24hrs
 *         activation token: token
 *       - 400:
 *         description: Already verified account
 *         message: Account is already activated
 *       - 404:
 *         description: Unregistered user
 *         message: User not found
 *       - 500:
 *         description: Server error
 *         message: Ooops! Something went wrong, kindly try again
 */
router.post('/resend/activation/mail', resendMail, emailNotification.notifyFollowers);


/**
 * @swagger
 *
 * /Verify:
 *   get:
 *     summary: Verify user account
 *     description: Verify new user account
 *     tags:
 *       - User routes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         description: verification token sent to users email
 *         in:  params
 *         required: true
 *         type: string
 *         format: json web token
 *     responses:
 *       - 200:
 *         description: resend new account activation link
 *         message: Your Account is Now Activated!
 *         login: token
 *       - 400:
 *         description: Already verified account
 *         message: Account is already activated
 *       - 500:
 *         description: Server error
 *         message: Ooops! Something went wrong, kindly try again
 */
router.get('/verifyemail/:token', jwtValidator, verifyNewUser);

/**
 * @swagger
 * /stat:
 *  post:
 *    summary: Get the read statistics of user
 *    description: Returns the articles title and description for an authenticated user
 *    tags:
 *      - User routes
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: userId
 *        description: uuid of the authenticated user
 *        in: jwt token
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        description: Sucessfully get user's readstat
 *        schema:
 *          type: object
 *      500:
 *        description: Error getting user's readstat
 *        schema:
 *          type: object
 */

router.get('/readstats', jwtValidator, getUserReadStatController);

module.exports = router;
