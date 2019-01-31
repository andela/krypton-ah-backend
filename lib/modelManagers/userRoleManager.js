const { Sequelize } = require('sequelize'),
  { User, Roles } = require('../../database/models');

const { Op } = Sequelize;

/**
 * @description Model Manager for Article and Admin
 *
 * @class UserRoleManager
 */
class RoleManager {
  /**
   * @description this manager checks admin authentication it check if the user is an admin
   * @param {*} userId
   * @static
   * @returns {*} admin
   * @memberof RoleManager
   */
  static async findUserRole(userId) {
    const options = {
      where: {
        id: {
          [Op.eq]: userId
        }
      },
      include: [
        {
          model: Roles,
          where: {
            role: {
              [Op.eq]: 'admin'
            }
          },
          attributes: ['id', 'role']
        }
      ],
      attributes: ['id', 'firstname', 'lastname', 'email']
    };
    const admin = await User.findOne(options);
    return admin;
  }

  /**
   *
   * @description the manager create admin role if the need arises
   * @static
   * @param {*} role
   * @returns {*} admin
   * @memberof UserRoleManager
   */
  static async createAdminRole(role) {
    const admin = await Roles.create({ role });
    return admin;
  }

  /**
   *
   * @description The manager was created to check if role already exist in the role table
   *  because role is meant to be unique
   * @static
   * @param {*} newRole
   * @returns {*} admin
   * @memberof UserRoleManager
   */
  static async findRole(newRole) {
    const options = {
      where: {
        role: {
          [Op.eq]: newRole
        }
      }
    };
    const role = await Roles.findOne(options);
    return role;
  }
}

module.exports = RoleManager;
