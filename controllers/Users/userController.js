const User = require('../../lib/modelManagers/usermodel');
const pagination = require('../../lib/utils/pagination/paginationHelper');
const constants = require('../../constants');
const response = require('../../lib/utils/helper_function');
const { getHistory } = require('../../lib/modelManagers/commentsHistoryModel');
const { successResponse, failureResponse, serverFailure } = require('../../lib/utils/messageHandler');
const {
  OK_CODE,
  SERVER_ERROR_MESSAGE,
  NOT_FOUND_CODE,
  HISTORY_RETRIEVED,
  HISTORY_NOT_FOUND
} = require('../../constants');

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
  static async getcommentsHistory(req, res) {
    const { userId } = req.params;
    try {
      const history = await getHistory('userId', userId);
      if (!history) {
        return failureResponse(res, HISTORY_NOT_FOUND, NOT_FOUND_CODE);
      }
      successResponse(res, HISTORY_RETRIEVED, OK_CODE, history);
    } catch (error) {
      return serverFailure(res, SERVER_ERROR_MESSAGE);
    }
  }
}

module.exports = UsersController;
