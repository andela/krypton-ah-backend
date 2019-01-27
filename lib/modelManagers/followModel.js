const { follows, User } = require('../../database/models');
/**
 * @description Follow and Unfollow user
 *
 * @class FollowModelManager
 */
class FollowModelManager {
  /**
   * @description handle follow user
   * @static
   * @param {any} followeeId
   * @param {any} followerId
   * @returns {object} return a new followee
   *
   * @memberOf FollowModelManager
   */
  static async followUser(followeeId, followerId) {
    const follow = await follows.findOrCreate({
      where: {
        followeeId,
        followerId
      },
      attributes: ['id', 'followerId', 'followeeId']
    })
      .spread((check, created) => created);
    return follow;
  }

  /**
 * @description Unfollow user
 *
 * @static
 * @param {any} followerId
 * @param {any} followeeId
 * @returns {null} null
 * @memberOf FollowModelManager
 */
  static async unfollowUser(followerId, followeeId) {
    const unFollow = await follows.destroy({
      where: {
        followerId,
        followeeId
      }
    });
    return unFollow;
  }

  /**
   * @description handle find and count numbers of occurances
   *
   * @static
   * @param {any} followeeId
   * @returns {object} return followee and count all
   * @memberOf FollowModelManager
   */
  static async getUserFollowers(followeeId) {
    const followers = await follows.findAndCountAll({
      where: {
        followeeId
      },
      attributes: ['id'],
      include: [
        {
          model: User,
          as: 'followers',
          attributes: ['id', 'email', 'firstname', 'lastname']
        }
      ]
    });
    return followers;
  }

  /**
   * @description handle find and count numbers of occurances
   *
   * @static
   * @param {any} followerId
   * @returns {object} return follower and count all
   * @memberOf FollowModelManager
   */
  static async getUserFollowees(followerId) {
    const myFollowees = await follows.findAndCountAll({
      where: {
        followerId
      },
      attributes: ['id'],
      include: [
        {
          model: User,
          as: 'following',
          attributes: ['id', 'email', 'firstname', 'lastname']
        }
      ]
    });
    return myFollowees;
  }
}

module.exports = FollowModelManager;
