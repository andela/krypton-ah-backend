const { UserRoles } = require('../../database/models');

/**
 * Declares user model manager class.
 * user model manager class contains user queries.
 */
class UserRoleManager {
  /**
   * @description this manager checks admin authentication it check if the user is an admin
   * @param {*} userId
   * @param {*} roleId
   * @static
   * @returns {*} admin
   * @memberof RoleManager
   */
  static async deleteUserRole(userId, roleId) {
    const options = {
      where: {
        userId,
        roleId
      }
    };
    const userRole = await UserRoles.destroy(options);
    return userRole;
  }
}

module.exports = UserRoleManager;
