const { Sequelize } = require('sequelize'),
  { Roles } = require('../../database/models');

const { Op } = Sequelize;

/**
 * @description Model Manager for Article and Admin
 *
 * @class UserRoleManager
 */
class RoleManager {
  /**
   *
   * @description the manager create admin role if the need arises
   * @static
   * @param {*} role
   * @returns {*} admin
   * @memberof UserRoleManager
   */
  static async createRole(role) {
    const newRole = await Roles.create({ role });
    return newRole;
  }

  /**
   *
   * @description The manager returns a list of all roles
   * @static
   * @param {*} columnName
   * @param {*} value
   * @returns {*} admin
   * @memberof UserRoleManager
   */
  static async findAllRoles() {
    const role = await Roles.findAll();
    return role;
  }

  /**
   *
   * @description This manager returns a single role
   * @static
   * @param {*} columnName
   * @param {*} value
   * @returns {*} admin
   * @memberof UserRoleManager
   */
  static async findRole(columnName, value) {
    const role = await Roles.findOne({
      where: {
        [columnName]: {
          [Op.eq]: value
        }
      }
    });
    return role;
  }

  /**
   *
   * @description The manager update a role
   * @static
   * @param {*} id
   * @param {*} newRole
   * @returns {*} admin
   * @memberof UserRoleManager
   */
  static async updateRole(id, newRole) {
    const updatedRole = await Roles.update(newRole, {
      where: { id },
      returning: true
    });
    return updatedRole;
  }

  /**
   *
   * @description The manager delete a role
   * @static
   * @param {*} id
   * @returns {*} admin
   * @memberof UserRoleManager
   */
  static async deleteRole(id) {
    const deletedRole = await Roles.destroy({
      where: {
        id
      }
    });
    return deletedRole;
  }
}

module.exports = RoleManager;
