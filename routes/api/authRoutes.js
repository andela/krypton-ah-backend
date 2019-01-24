const router = require('express').Router();
const signupValidator = require('../../lib/utils/signupValidator');
const checkEmail = require('../../middlewares/checkEmail');
const authController = require('../../controllers/AuthController');
const sendVerficationMail = require('../../lib/utils/emailService/emailVerification');
/**
 * @swagger
 *
 * /signin:
 *   post:
 *     description: Signin to the application
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
 *     description: Creates a new user and moves to route for sending email
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
router.route('/signup').post(signupValidator, checkEmail, authController.signUp, sendVerficationMail);

module.exports = router;
