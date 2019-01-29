const { userprofile } = require('../../database/models');
const { ID_REQUIRED } = require('../../constants');
/**
 * Declares user profile model manager class.
 * user profile model manager class contains user profile queries.
 */
class UserProfile {
  /**
   * Create a new user profile
   * @param {object} userProfileDetails user profile info
   * @param {boolean} emailnotification whether the user should recieve email notification or not
   * @returns {object} The created user profile
   */
  static async createUserProfile(userProfileDetails) {
    const { userId, ...rest } = userProfileDetails;
    if (!userId) {
      throw new Error(ID_REQUIRED);
    }
    const createdUserProfile = await userprofile.create({
      UserId: userId,
      ...rest
    });
    return createdUserProfile;
  }

  /**
   * Update user profile
   * @param {string} userId The userId of the user to be updated.
   * @param {object} userProfileUpdate Field to be updated as key and new update as value.
   * @static
   * @memberof User
   * @returns {object} details updated
   */
  static async updateUserProfile(userId, userProfileUpdate) {
    const updatedRecord = await userprofile.update(userProfileUpdate, {
      where: {
        UserId: userId
      },
      returning: true,
      plain: true
    });
    return updatedRecord;
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
    const UserRecord = await userprofile.findOne({
      where: { [columnName]: value },
    });

    return UserRecord;
  }
}

module.exports = UserProfile;
