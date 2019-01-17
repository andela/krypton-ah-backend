const User = require('../../lib/modelManagers/usermodel');
const pagination = require('../../lib/utils/pagination/paginationHelper');
const response = require('../../lib/utils/helper_function');
const message = require('../../constants');

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
        response.successResponse(res, message.userRetrievalSuccessMessage, users);
      }
    } catch (error) {
      response.failureResponse(res, message.serverFailureMessage, message.SERVER_ERROR_CODE);
    }
  }
}


module.exports = UsersController;
