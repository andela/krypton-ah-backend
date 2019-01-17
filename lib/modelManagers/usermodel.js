const { userprofile } = require('../../database/models');
const user = require('../../database/models').User;

/**
 * Declares user model manager class.
 * user model manager class contains user queries.
 */
class UserModelManager {
  /**
   *
   *@param {email} email The user's username.
   * @param {password} password The user's password.
   * @param {firstname} firstname The user's firstname.
   * @param {lastname} lastname The user's lastname.
   * @static
   * @memberof User
   * @returns {object} The parameters from the query
   */
  static async create(email, password, firstname, lastname) {
    const createdRecord = await user.create({
      email,
      password,
      firstname,
      lastname
    });
    return createdRecord;
  }


  /**
   *
   * @param {id} id The user's id.
   * @param {object} newData The field to be updated and value.
   * @static
   * @memberof User
   * @returns {object} The parameters from the query
   */
  static async update(id, newData) {
    const updatedRecord = await user.update(newData, { where: { id } });
    return updatedRecord;
  }

  /**
   * @param {string} columnName The collumn to search for.
   * @param {string} value The value to search for.
   * @static
   * @memberof User
   * @returns {object} found user
   */
  static async findUser(columnName, value) {
    const UserRecord = await user.findOne({
      where: { [columnName]: value }
    });
    return UserRecord;
  }

  /**
   *
   * @param {id} id The user's id.
   * @static
   * @memberof User
   * @returns {object} The parameters from the query
   */
  static async delete(id) {
    const deletedRecord = await user.destroy({
      where: {
        id
      }
    });
    return deletedRecord;
  }

  /**
   *
   * @param {limit} limit The limit of results query should return.
   * @param {offset} offset The number of queries to be skipped i.e offset.
   * @static
   * @memberof User
   * @returns {object} The parameters from the query
   */
  static async listAllUsers(limit, offset) {
    const userRecords = await user.findAll({
      include: [{ model: userprofile }],
      limit,
      offset
    });
    return userRecords;
  }
}

module.exports = UserModelManager;
