const router = require('express').Router();
const signupValidator = require('../../lib/utils/signupValidator');
const checkEmail = require('../../middlewares/checkEmail');
const authController = require('../../controllers/AuthController');

/**
 * @swagger
 *
 * /signin:
 *   post:
 *     summary: Sign in a user to the application
 *     description: Signin to the application
 *     tags:
 *       - Authentication routes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: user email to save for new user
 *         in:  body
 *         required: true
 *         type: string
 *         format: email
 *       - name: password
 *         description: user password to save for new user
 *         in:  body
 *         required: true
 *         type: string
 *         format: password
 *     responses:
 *       - 200:
 *         description: Signin
 *         message: Login Successful
 *         loginToken: token
 *       - 400:
 *         description: Unverified account
 *         message: Please verify account before login
 *       - 400:
 *         description: Incorrect info
 *         message: Incorrect Credentials
 *       - 404:
 *         description: User without an account
 *         message: Email does not match our record
 *
 *
 */
router.route('/signin').post(authController.signIn);

/**
 * @swagger
 *
 * /signup:
 *   post:
 *     summary: Create a new user account
 *     description: Creates a new user and moves to route for sending email
 *     tags:
 *       - Authentication routes
 *     parameters:
 *       - name: email
 *         description: user email to save for new user
 *         in:  body
 *         required: true
 *         type: string
 *         format: email
 *       - name: password
 *         description: user password to save for new user
 *         in:  body
 *         required: true
 *         type: string
 *         format: password
 *       - name: firstname
 *         description: firstname to save for new user
 *         in:  body
 *         required: true
 *         type: string
 *       - name: lastname
 *         description: lastname to save for new user
 *         in:  body
 *         required: true
 *         type: string
 */
router.route('/signup').post(signupValidator, checkEmail, authController.signUp);

module.exports = router;
