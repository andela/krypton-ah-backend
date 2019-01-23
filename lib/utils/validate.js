const {
  INVALID_EMAIL,
  VALIDATE_EMAIL_NOTIFICATION_ERROR,
  VALIDATE_GENDER_ERROR,
  VALIDATE_PHONENUMBER_ERROR,
  VALIDATE_URL_ERROR,
  VALIDATE_USERNAME_ERROR
} = require('../../constants/index');
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

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
  validateUrl,
  validateEmailNotification,
  validateGender,
  validatePhoneNumber,
  validateUsername,
};
