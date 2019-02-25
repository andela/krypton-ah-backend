const User = require('../../lib/modelManagers/usermodel');
const pagination = require('../../lib/utils/pagination/paginationHelper');
const constants = require('../../constants');
const response = require('../../lib/utils/helper_function');
const { getModifiedComments } = require('../../lib/modelManagers/commentsHistoryModel');
const { successResponse, serverFailure } = require('../../lib/utils/messageHandler');
const { OK_CODE, SERVER_ERROR_MESSAGE, HISTORY_RETRIEVED } = require('../../constants');

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

  /**
   * @description Gets users comment history Controller
   * @param {*} req
   * @param {*} res
   * @returns {*} *
   */
  static async getModifiedComments(req, res) {
    const { userId } = req.params;
    try {
      const history = await getModifiedComments('userId', userId);
      successResponse(res, HISTORY_RETRIEVED, OK_CODE, history);
    } catch (error) {
      return serverFailure(res, SERVER_ERROR_MESSAGE);
    }
  }
}

module.exports = UsersController;
