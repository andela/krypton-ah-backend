const express = require('express'),
  SocialMediaController = require('../../controllers/socialLoginControllers'),
  passport = require('../../vendors/passport');

require('dotenv/config');

const socialRouter = express.Router();

/**
 * Redirect the user to Facebook for authentication. When complete,
 * Facebook will redirect the user back to the application at
 * /auth/facebook/callback
 */
socialRouter.get('/auth/facebook', passport.authenticate('facebook',
  {
    scope: ['email']
  }));

/**
 * Facebook will redirect the user to this URL after approval.  Finish the
 * authentication process by attempting to obtain an access token.  If
 * access was granted, the user will be logged in.  Otherwise,
 * authentication has failed.
 */
socialRouter.get('/auth/facebook/callback',
  passport.authenticate('facebook'),
  SocialMediaController.getUserToken);

/**
 * GET /auth/google
 * Use passport.authenticate() as route middleware to authenticate the
 * request.  The first step in Google authentication will involve
 * redirecting the user to google.com.  After authorization, Google
 * will redirect the user back to this application at /auth/google/callback
 */
socialRouter.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
socialRouter.get('/auth/google/callback',
  passport.authenticate('google'),
  SocialMediaController.getUserToken);

socialRouter.get('/auth/linkedin',
  passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] }));

socialRouter.get('/auth/linkedin/callback',
  passport.authenticate('linkedin'),
  SocialMediaController.getUserToken);

module.exports = socialRouter;
