require('dotenv').config();
const User = require('../lib/modelManagers/usermodel');
const response = require('../lib/utils/responses');
const {
  BAD_REQUEST_CODE,
  OK_CODE,
  SERVER_ERROR_CODE,
  SERVER_ERROR,
  ACCOUNT_ACTIVATED,
  ALREADY_ACTIVATED_ERROR
} = require('../constants');
/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @returns {object} response object based on the user account verification operation.
 */
const verifyNewUser = async (req, res) => {
  const { uuid } = req.decodedToken;
  const findUser = await User.getUser(uuid);

  if (findUser.isverified === true) {
    return response(res, BAD_REQUEST_CODE, false, ALREADY_ACTIVATED_ERROR);
  }

  const field = { isverified: true };

  try {
    const updatedUser = await User.update(uuid, field);
    if (updatedUser) {
      return response(res, OK_CODE, true, ACCOUNT_ACTIVATED);
    }
  } catch (err) {
    return response(res, SERVER_ERROR_CODE, false, SERVER_ERROR);
  }
};
module.exports = verifyNewUser;
