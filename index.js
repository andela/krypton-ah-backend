/* eslint-disable no-console */
const express = require('express'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  cors = require('cors'),
  passport = require('passport'),
  errorhandler = require('errorhandler'),
  isProduction = process.env.NODE_ENV === 'production';
const socialRouter = require('./routes/api/socialMediaRoute');

// Load environment variables
require('dotenv').config();

// Create global app object
const app = express();

app.use(cors());

// Normal express config defaults
app.use(require('morgan')('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('method-override')());

app.use(express.static(`${__dirname}/public`));

app.use(
  session({
    secret: 'authorshaven',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
);

if (!isProduction) {
  app.use(errorhandler());
}

app.use(require('./routes'));

/**
 * @swagger
 * /:
 *  get:
 *    summary: Author's Haven root endpoint
 *    description: Returns a welcome message
 *    responses:
 *      200:
 *        description: A welcome message
 *        schema:
 *          type: string
 *          default: "Test Successful"
 */
app.use(passport.initialize());

// Social Route
app.use('/api/v1/', socialRouter);

app.get('/', (req, res) => res.status(200).send('Test Successful'));

// / catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// / error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use((err, req, res) => {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});

// finally, let's start our server...
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${server.address().port}`);
});

module.exports = app;
