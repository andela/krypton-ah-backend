const passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy,
  GoogleStrategy = require('passport-google-oauth20').Strategy,
  LinkedInStrategy = require('passport-linkedin-oauth2').Strategy,
  TwitterStrategy = require('passport-twitter').Strategy;
const SocialController = require('../controllers/socialLoginControllers');

require('dotenv/config');

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  profileFields: ['displayName', 'photos', 'emails']
}, SocialController.socailLoginsCallback));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  proxy: true
}, SocialController.socailLoginsCallback));

passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_KEY,
  clientSecret: process.env.LINKEDIN_SECRET,
  callbackURL: process.env.LINKEDIN_CALLBACK_URL,
  scope: ['r_basicprofile', 'r_emailaddress'],
}, SocialController.socailLoginsCallback));

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_KEY,
  consumerSecret: process.env.TWITTER_SECRET,
  callbackURL: process.env.TWITTER_CALLBACK_URL,
  includeEmail: true
}, SocialController.socailLoginsCallback));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
