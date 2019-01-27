const {
    followUser,
    unfollowUser,
    getUserFollowers,
    getUserFollowees
  } = require('../lib/modelManagers/followModel'),
  { getUser } = require('../lib/modelManagers/usermodel'),
  {
    failureResponse,
    successResponse
  } = require('../lib/utils/helper_function');

const {
  OK_CODE,
  RESOURCE_CREATED_CODE,
  BAD_REQUEST_CODE,
  ALREADY_FOLLOWING_AUTHOR,
  FOLLOW_SELF,
  NOT_FOUND_CODE,
  NOW_FOLLOWING_USER,
  UNFOLLOW_USER_MESSAGE,
  MY_FOLLOWEES,
  MY_FOLLOWERS,
  NOT_FOUND_CODE_MESSAGE,
  NO_FOLLOWER,
  NO_FOLLOWEE,
  SERVER_ERROR_CODE,
  SERVER_ERROR_MESSAGE
} = require('../constants/index');

/**
 * @description Class contains follow and unfollow user
 * @class FollowUsersController
 */
class FollowUsersController {
  /**
  *
  *
  * @static
  * @param {any} req Request Object
  * @param {any} res Response Object
  * @returns {*} - Return a new follower
  * @memberOf FollowUsersController
  */
  static async follow(req, res) {
    try {
      const followeeId = req.decodedToken.payLoad;
      const { id } = req.params;
      const user = await getUser(id);
      if (user) {
        if (id !== followeeId) {
          const followAUser = await followUser(followeeId, id);
          if (followAUser) {
            return successResponse(res, NOW_FOLLOWING_USER, followAUser, RESOURCE_CREATED_CODE);
          }
          return failureResponse(res, ALREADY_FOLLOWING_AUTHOR, BAD_REQUEST_CODE);
        }
        return failureResponse(res, FOLLOW_SELF, BAD_REQUEST_CODE);
      } return failureResponse(res, NOT_FOUND_CODE_MESSAGE, NOT_FOUND_CODE);
    } catch (error) {
      return failureResponse(res, SERVER_ERROR_MESSAGE, SERVER_ERROR_CODE);
    }
  }

  /**
 *
 * @static
 * @param {any} req Request object
 * @param {any} res Response object
 * @returns {object} - Unfollow user
 * @memberOf FollowUsersController
 */
  static async unfollow(req, res) {
    try {
      const followerId = req.params.id;
      const followeeId = req.decodedToken.payLoad;
      const user = await getUser(followeeId);
      if (user) {
        if (followeeId !== followerId) {
          const destroyFollowing = await unfollowUser(followerId, followeeId);
          if (destroyFollowing) {
            return successResponse(res, UNFOLLOW_USER_MESSAGE, destroyFollowing, OK_CODE);
          }
        } return failureResponse(res, FOLLOW_SELF, BAD_REQUEST_CODE);
      } return failureResponse(res, NOT_FOUND_CODE_MESSAGE, NOT_FOUND_CODE);
    } catch (error) {
      return failureResponse(res, SERVER_ERROR_MESSAGE, SERVER_ERROR_CODE);
    }
  }

  /**
 * @description All users followees
 *
 * @static
 * @param {any} req
 * @param {any} res
 * @returns {Array} an Array of followees
 *
 * @memberOf FollowUsersController
 */
  static async followers(req, res) {
    const { id } = req.query;
    try {
      const user = await getUser(id);
      if (user) {
        const userFollowers = await getUserFollowers(id);

        if (userFollowers.count === 0) {
          return successResponse(res, NO_FOLLOWEE, userFollowers, NOT_FOUND_CODE);
        }
        return successResponse(res, MY_FOLLOWEES, userFollowers, OK_CODE);
      } return failureResponse(res, NOT_FOUND_CODE_MESSAGE, NOT_FOUND_CODE);
    } catch (error) {
      return failureResponse(res, SERVER_ERROR_MESSAGE, SERVER_ERROR_CODE);
    }
  }

  /**
 * @description handle all user follower
 *
 * @static
 * @param {any} req
 * @param {any} res
 * @returns {Array} return an array of followers
 *
 * @memberOf FollowUsersController
 */
  static async following(req, res) {
    const { id } = req.query;
    try {
      const user = await getUser(id);
      if (user) {
        const following = await getUserFollowees(id);
        if (following.count === 0) {
          return successResponse(res, NO_FOLLOWER, following, NOT_FOUND_CODE);
        }
        return successResponse(res, MY_FOLLOWERS, following, OK_CODE);
      } return failureResponse(res, NOT_FOUND_CODE_MESSAGE, NOT_FOUND_CODE);
    } catch (error) {
      return failureResponse(res, SERVER_ERROR_MESSAGE, SERVER_ERROR_CODE);
    }
  }
}


module.exports = FollowUsersController;
