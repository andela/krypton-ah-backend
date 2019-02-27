const UserProfileManager = require('../lib/modelManagers/userProfileModel'),
  { getUserProfileFromRequest } = require('../lib/utils/helpers'),
  { successResponse, failureResponse } = require('../lib/utils/helper_function'),
  {
    SERVER_ERROR_CODE,
    RESOURCE_CREATED_CODE,
    CREATE_USER_PROFILE_ERROR_MESSAGE,
    CREATE_USER_PROFILE_SUCCESS_MESSAGE,
    UPDATE_USER_PROFILE_ERROR_MESSAGE,
    UPDATE_USER_PROFILE_SUCCESS_MESSAGE
  } = require('../constants/index');

/**
 *
 * @param {object} req express request object
 * @param {Object} res express response object
 */

const createUserProfileController = async (req, res) => {
  const userId = req.decodedToken.payLoad;
  const userProfileUpdate = getUserProfileFromRequest(req);
  try {
    const createdProfile = await UserProfileManager.createUserProfile({
      userId,
      ...userProfileUpdate
    });
    return successResponse(res, CREATE_USER_PROFILE_SUCCESS_MESSAGE, {
      ...createdProfile.dataValues
    }, RESOURCE_CREATED_CODE);
  } catch (error) {
    return failureResponse(res, CREATE_USER_PROFILE_ERROR_MESSAGE, SERVER_ERROR_CODE);
  }
};

const updateUserProfileController = async (req, res) => {
  const userId = req.decodedToken.payLoad;
  const userProfileUpdate = getUserProfileFromRequest(req);
  try {
    const updatedProfile = await UserProfileManager.updateUserProfile(userId, userProfileUpdate);
    return successResponse(res, UPDATE_USER_PROFILE_SUCCESS_MESSAGE, {
      ...updatedProfile['1'].dataValues
    });
  } catch (error) {
    return failureResponse(res, UPDATE_USER_PROFILE_ERROR_MESSAGE, SERVER_ERROR_CODE);
  }
};

module.exports = { createUserProfileController, updateUserProfileController };
