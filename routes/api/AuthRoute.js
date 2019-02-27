const express = require('express'),
  SocialMediaController = require('../../controllers/socialLoginControllers'),
  passport = require('../../vendors/passport');

require('dotenv/config');

const socialRouter = express.Router();
socialRouter.use(passport.initialize());

/**
 * @swagger
 *
 * /facebook:
 *   get:
 *     summary: Login a user through facebook
 *     description: Login a user
 *     produces:
 *       - application/json
 *     tags:
 *       - Authentication routes
 *     responses:
 *        - 200:
 *          description: retrieve user's data through facebook
 *          message: Welcome back
 *        - 500:
 *          description: Server Error
 *          message: There as been a server error
 *
 *
 */
socialRouter.get(
  '/facebook',
  passport.authenticate(
    'facebook',
    {
      scope: ['email']
    }
  )
);

socialRouter.get(
  '/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  SocialMediaController.getUserToken
);

/**
 * GET /google
 * Use passport.authenticate() as route middleware to authenticate the
 * request.  The first step in Google authentication will involve
 * redirecting the user to google.com.  After authorization, Google
 * will redirect the user back to this application at /google/callback
 */
/**
 * @swagger
 *
 * /google:
 *   get:
 *     summary: Login a user through google
 *     description: Login a user
 *     produces:
 *       - application/json
 *     tags:
 *       - Authentication routes
 *     responses:
 *        - 200:
 *          description: retrieve user's data through google
 *          message: Welcome back
 *        - 500:
 *          description: Server Error
 *          message: There as been a server error
 *
 *
 */
socialRouter.get(
  '/google',
  passport.authenticate(
    'google',
    {
      scope: ['profile', 'email']
    }
  )
);

socialRouter.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  SocialMediaController.getUserToken
);

/**
 * @swagger
 *
 * /twitter:
 *   get:
 *     summary: Login a user through twitter
 *     description: Login a user
 *     produces:
 *       - application/json
 *     tags:
 *       - Authentication routes
 *     responses:
 *        - 200:
 *          description: retrieve user's data through twitter
 *          message: Welcome back
 *        - 500:
 *          description: Server Error
 *          message: There as been a server error
 *
 *
 */
socialRouter.get(
  '/twitter',
  passport.authenticate(
    'twitter',
    {
      scope: ['include_email: true']
    }
  )
);

socialRouter.get(
  '/twitter/callback',
  passport.authenticate('twitter', { session: false }),
  SocialMediaController.getUserTokenTwitter
);

/**
 * @swagger
 *
 * /linkedin:
 *   get:
 *     summary: Login a user through linkedin
 *     description: Login a user
 *     produces:
 *       - application/json
 *     tags:
 *       - Authentication routes
 *     responses:
 *        - 200:
 *          description: retrieve user's data through linkedin
 *          message: Welcome back
 *        - 500:
 *          description: Server Error
 *          message: There as been a server error
 *
 *
 */
socialRouter.get(
  '/linkedin',
  passport.authenticate('linkedin')
);

socialRouter.get(
  '/linkedin/callback',
  passport.authenticate('linkedin', { session: false }),
  SocialMediaController.getUserToken
);


module.exports = socialRouter;
