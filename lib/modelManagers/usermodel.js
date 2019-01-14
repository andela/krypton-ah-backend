const user = require('../../database/models/user');
/**
 * Declares user model manager class.
 * user model manager class contains user queries.
 */
class User {
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
      email, password, firstname, lastname
    });
    return createdRecord;
  }

  /**
   *
   * @param {id} id The user's id.
   * @param {field} field The field to be updated.
   * @static
   * @memberof User
   * @returns {object} The parameters from the query
   */
  static async update(id, field) {
    const updatedRecord = await user.update(
      {
        field,
      },
      {
        where: {
          id
        }
      }
    );
    return updatedRecord;
  }

  /**
   *
   * @param {id} id The user's id.
   * @static
   * @memberof User
   * @returns {object} The parameters from the query
   */
  static async delete(id) {
    const deletedRecord = await user.delete({
      where: {
        id
      }
    });
    return deletedRecord;
  }
}

module.exports = User;
