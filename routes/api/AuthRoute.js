const express = require('express'),
  SocialMediaController = require('../../controllers/socialLoginControllers'),
  passport = require('../../vendors/passport');

require('dotenv/config');

const socialRouter = express.Router();
socialRouter.use(passport.initialize());

/**
 * Redirect the user to Facebook for authentication. When complete,
 * Facebook will redirect the user back to the application at
 * /facebook/callback
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

/**
 * Facebook will redirect the user to this URL after approval.  Finish the
 * authentication process by attempting to obtain an access token.  If
 * access was granted, the user will be logged in.  Otherwise,
 * authentication has failed.
 */
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
  SocialMediaController.getUserToken
);

// GET user information using linkedin
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
