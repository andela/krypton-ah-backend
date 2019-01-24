const userProfileRouter = require('express').Router(),
  userProfileValidator = require('../../middlewares/userProfileValidator'),
  jwtValidator = require('../../middlewares/jwtValidator'),
  {
    createUserProfileController,
    updateUserProfileController
  } = require('../../controllers/userProfileController');

userProfileRouter.use(jwtValidator, userProfileValidator);
/**
 * @swagger
 * /api/profile:
 *  post:
 *    summary: Create profile for an existing user
 *    description: Returns details of user profile
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: userId
 *        description: uuid of the authenticated user
 *        in: jwt token
 *        required: true
 *        type: string
 *      - name: bio
 *        description: About the user
 *        in: body
 *        required: false
 *        type: string
 *      - name: username
 *        description: Unique username of the user
 *        in: body
 *        required: false
 *        type: string
 *      - name: country
 *        description: Country the user lives in
 *        in: body
 *        required: false
 *        type: string
 *      - name: phonenumber
 *        description: Phone number of the user
 *        in: body
 *        required: false
 *        type: string
 *      - name: gender
 *        description: Gender of the user. Male or Female
 *        in: body
 *        required: false
 *        type: string
 *      - name: emailnotification
 *        description: Specifies whether the user want to receive email notification
 *        in: body
 *        required: true
 *        type: boolean
 *    responses:
 *      200:
 *        description: User profile successfully created
 *        schema:
 *          type: string
 *      500:
 *        description: Error creating user profile
 *        schema:
 *          type: string
 */

/**
 * @swagger
 * /api/profile:
 *  post:
 *    summary: Updates the profile details of a user
 *    description: Returns details of user profile
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: userId
 *        description: uuid of the authenticated user
 *        in: jwt token
 *        required: true
 *        type: string
 *      - name: bio
 *        description: About the user
 *        in: body
 *        required: false
 *        type: string
 *      - name: username
 *        description: Unique username of the user
 *        in: body
 *        required: false
 *        type: string
 *      - name: country
 *        description: Country the user lives in§
 *        in: body
 *        required: false
 *        type: string
 *      - name: phonenumber
 *        description: Phone number of the user
 *        in: body
 *        required: false
 *        type: string
 *      - name: gender
 *        description: Gender of the user. Male or Female
 *        in: body
 *        required: false
 *        type: string
 *      - name: emailnotification
 *        description: Specifies whether the user want to receive email notification
 *        in: body
 *        required: false
 *        type: boolean
 *    responses:
 *      200:
 *        description: User profile successfully updated
 *        schema:
 *          type: string
 *      500:
 *        description: Error creating user profile
 *        schema:
 *          type: string
 */

userProfileRouter
  .route('/')
  .post(createUserProfileController)
  .put(updateUserProfileController);

module.exports = userProfileRouter;
