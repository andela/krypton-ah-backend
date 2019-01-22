const User = require('../../lib/modelManagers/usermodel');
const pagination = require('../../lib/utils/pagination/paginationHelper');
const response = require('../../lib/utils/helper_function');
const constants = require('../../constants');

/**
 *
 *
 * @class Userscontroller
 */
class UsersController {
  /**
   * @static
   * @returns { undefined } undefined
   * @param {*} req
   * @param {*} res
   */
  static async listUsers(req, res) {
    const { limit, offset } = pagination(req.query);
    try {
      const users = await User.listAllUsers(limit, offset);
      if (users) {
        response.successResponse(res, constants.USER_RETRIEVAL_SUCCESS_MESSAGE, users);
      }
    } catch (error) {
      response.failureResponse(
        res,
        constants.SERVER_RETRIEVAL_MESSAGE,
        constants.SERVER_ERROR_CODE
      );
    }
  }
}

module.exports = UsersController;
