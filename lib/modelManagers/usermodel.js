const { userprofile } = require('../../database/models'),
  user = require('../../database/models').User;
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
   * @param {string} email user's Email to search.
   * @static
   * @memberof User
   * @returns {object} The parameters from the query
   */
  static async findUserByEmail(email) {
    const userRecord = await user.findOne({
      where: {
        email
      }
    });
    return userRecord;
  }

  /**
   *
   * @param {id} id The user's id.
   * @static
   * @memberof User
   * @returns {object} a user object
   */
  static async getUser(id) {
    const findUser = await user.findOne({
      where: {
        id
      },
      include: [{ model: userprofile, as: 'userprofile' }]
    });
    return findUser;
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
    const updatedRecord = await user.update(newData, {
      where: { id },
      returning: true
    });
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
   *
   * @static
   * @param {any} emails
   * @param {any} name
   * @returns {object} User
   *
   * @memberOf User
   */
  static async findOrCreateUser(emails, name) {
    const createdUser = await user.findOrCreate({
      where: {
        $or: [{ email: emails[0].value }]
      },
      defaults: {
        email: emails[0].value,
        password: 'uEyMTw32v9',
        firstname: name[0],
        lastname: name[1],
        isverified: true
      }
    });
    return createdUser;
  }

  /**
   *  @static
   * @param {*} limit
   * @param {*} offset
   * @returns {*} object
   * @memberof UserModelManager
   */
  static async listAllUsers(limit, offset) {
    const userRecords = await user.findAll({
      include: [{ model: userprofile, as: 'userprofile' }],
      limit,
      offset
    });
    return userRecords;
  }

  /**
   * @param {string} columnName The collumn to be search.
   * @param {string} value The value to search for.
   * @static
   * @memberof User
   * @returns {null} if user is not found.
   * @returns {object} if user is found.
   */
  static async getUserDetails(columnName, value) {
    const UserRecord = await user.findOne({
      where: { [columnName]: value }
    });

    return UserRecord;
  }
}

module.exports = UserModelManager;
