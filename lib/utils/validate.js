const {
    INVALID_EMAIL,
    VALIDATE_EMAIL_NOTIFICATION_ERROR,
    VALIDATE_GENDER_ERROR,
    VALIDATE_PHONENUMBER_ERROR,
    VALIDATE_URL_ERROR,
    VALIDATE_USERNAME_ERROR,
    isRequiredError,
    booleanError,
    INVALID_TAG_NAME
  } = require('../../constants/index'),
  articleModelManager = require('../../lib/modelManagers/articlemodel');

/**
 *
 * @description This function validate input field that need an alphabet
 * @param {object} req
 * @param {string} name
 * @returns {*} *
 */
function validateName(req, name) {
  req
    .check(name)
    .notEmpty()
    .withMessage(`${name} is required`)
    .isAlpha()
    .trim()
    .withMessage(`${name} must be alphabets`);
}
/**
 *
 * @description This function validate input field that need an alphabet
 * @param {object} req
 * @param {string} email
 * @returns {*} *
 */
function validateEmail(req, email) {
  req
    .check(email)
    .notEmpty()
    .withMessage(`${email} is required`)
    .isEmail()
    .trim()
    .withMessage(INVALID_EMAIL);
}
/**
 *
 * @description This function validate input field that need an alphabet
 * @param {object} req
 * @param {string} password
 * @returns {*} *
 */
function validatePassword(req, password) {
  req
    .check(password)
    .notEmpty()
    .withMessage(`${password} is required`)
    .isLength({ min: 8 })
    .withMessage(`${password} must not be less than 8 characters`)
    .matches('[a-z]')
    .withMessage(`${password} must contain atleast a lowercase`)
    .matches('[A-Z]')
    .withMessage(`${password} must contain atleast an uppercase`)
    .matches('[0-9]')
    .withMessage(`${password} must contain atleast a number`);
}

const validateUrl = (req, url) => {
  req
    .check(url)
    .optional()
    .isURL()
    .withMessage(`${url} ${VALIDATE_URL_ERROR}`);
};

const validatePhoneNumber = (req) => {
  req
    .check('phonenumber')
    .optional()
    .matches(/^[+]\d{7,15}$/)
    .withMessage(VALIDATE_PHONENUMBER_ERROR);
};

const validateGender = (req) => {
  req
    .check('gender')
    .optional()
    .matches(/^(male|female)$/)
    .withMessage(VALIDATE_GENDER_ERROR);
};

const validateEmailNotification = (req) => {
  req
    .check('emailnotification')
    .optional()
    .isBoolean()
    .withMessage(VALIDATE_EMAIL_NOTIFICATION_ERROR);
};

const validateUsername = (req) => {
  req
    .check('username')
    .optional()
    .isLength({ min: 2 })
    .isAlpha()
    .trim()
    .withMessage(VALIDATE_USERNAME_ERROR);
};
/**
 *
 * @description This function validate input field that need an alphabet
 * @param {object} req
 * @param {string} uuid
 * @returns {*} *
 */
function validateUUID(req, uuid) {
  req
    .check(uuid)
    .notEmpty()
    .withMessage(`An uuid is required for ${uuid}`)
    .isUUID()
    .trim()
    .withMessage(`A valid uuid is required for ${uuid}`);
}

/**
 *
 * @description This function validate input field that need an alphabet
 * @param {object} req
 * @param {integer} rating
 * @returns {*} *
 */
function validateRating(req) {
  req
    .check('rating')
    .notEmpty()
    .withMessage('A rating is required')
    .isInt()
    .withMessage('An integer is expected for rating')
    .matches(/[1-5]/)
    .withMessage('Rating should be from 1 to 5')
    .isLength({ max: 1 })
    .withMessage('Rating should be from 1 to 5');
}

/**
 * Ensure that article title is unique for a particular user
 * @param {*} req
 * @param {string} userId
 * @returns {undefined} *
 */
const validateArticleTitle = (req) => {
  req
    .check('title')
    .trim()
    .notEmpty()
    .withMessage(isRequiredError('title'))
    .isLength({ min: 5, max: 400 })
    .withMessage('title must be between 5 and 400 characters')
    .custom(async (value) => {
      const oldArticleWithNewTitle = await articleModelManager.getArticlesby(
        'authorId',
        req.decodedToken.payLoad
      );
      if (oldArticleWithNewTitle.length < 1) {
        return;
      }

      if (oldArticleWithNewTitle[0].dataValues.title === value) {
        return Promise.reject();
      }
    })
    .withMessage('title must be unique for a particular user');
};

const validateArticleDescription = (req) => {
  req
    .check('description')
    .trim()
    .notEmpty()
    .withMessage(isRequiredError('description'))
    .isLength({ min: 5, max: 200 })
    .withMessage('description must be between 5 and 200 characters');
};

const validateIsPublished = (req) => {
  req
    .check('ispublished')
    .trim()
    .notEmpty()
    .withMessage(isRequiredError('ispublished'))
    .isBoolean()
    .withMessage(booleanError('ispublished'));
};

/**
 * Validates string content. Value must not be null.
 * @param {object} req express request object
 * @param {object} fieldName name of field to be validated. E.g title
 * @returns {undefined} *
 */
const validateArticleContent = (req) => {
  req
    .check('content')
    .trim()
    .notEmpty()
    .withMessage(isRequiredError('content'));
};

/**
 *
 * @description This function validate input field that need an alphabet
 * @param {object} req
 * @param {string} tag
 * @returns {*} true/false
 */
const validateTag = (req) => {
  req
    .check('tag')
    .trim()
    .matches(/^(?![#a-zA-Z0-9].*$).*/)
    .withMessage(INVALID_TAG_NAME);
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
  validateUrl,
  validateEmailNotification,
  validateGender,
  validatePhoneNumber,
  validateUsername,
  validateArticleContent,
  validateArticleTitle,
  validateIsPublished,
  validateArticleDescription,
  validateUUID,
  validateRating,
  validateTag
};
