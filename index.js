/* eslint-disable no-console */
const express = require('express'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  cors = require('cors'),
  validator = require('express-validator'),
  errorhandler = require('errorhandler'),
  isProduction = process.env.NODE_ENV === 'production';

// Load environment variables
require('dotenv').config();

// Create global app object
const app = express();

app.use(cors());

// Normal express config defaults
app.use(require('morgan')('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(validator());

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
app.get('/', (req, res) => res.status(200).send('Test Successful'));

// finally, let's start our server...
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${server.address().port}`);
});

module.exports = app;
