const router = require('express').Router();
const forgetPassword = require('../../controllers/forgetPasswordController');

router
/**
 * @swagger
 * /reset:
 *   post:
 *     summary: Send reset link to user email
 *     description: Sends reset link to users email
 *     tags:
 *      - User routes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: email address reset link will be sent
 *         in:  body
 *         required: true
 *         type: string
 *         format: email
 *     responses:
 *       - 200:
 *         description: Reset link sent
 *         message: Reset link sent succesfully
 *       - 400:
 *         description: Unregistered Email
 *         message: Email does not exist
 *       - 400:
 *         description: Email service error
 *         message: Reset link not sent
 */
  .post('/', forgetPassword.sendResetLink)

/**
 * @swagger
 * /token:
 *   get:
 *     summary: Check token from reset link
 *     description: Check token from reset link
 *     tags:
 *       - User routes
 *     parameters:
 *       - in: params
 *         name: token
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Reset link Valid
 *       400:
 *         description: Reset Link Expired
 */
  .get('/:token', forgetPassword.checkResetLink);

module.exports = router;
