const { INVALID_EMAIL } = require('../../constants/index');
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

module.exports = { validateName, validateEmail, validatePassword };
