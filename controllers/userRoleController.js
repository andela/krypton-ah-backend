const RoleManager = require('../lib/modelManagers/roleManager'),
  userModelManager = require('../lib/modelManagers/usermodel'),
  userRoleManager = require('../lib/modelManagers/userRoleManager'),
  { successResponse, failureResponse, serverFailure } = require('../lib/utils/messageHandler'),
  {
    OK_CODE,
    ROLE_ASSIGNED,
    CONFLICT_CODE,
    NOT_FOUND_CODE,
    OPERATION_SUCCESSFUL
  } = require('../constants/index');

/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @returns {*} *
 */
async function assignRoleToUser(req, res) {
  try {
    const { email, role } = req.body;
    const Role = await RoleManager.findRole('role', role);
    if (!Role) {
      return failureResponse(res, 'role does not exist', NOT_FOUND_CODE);
    }
    const roleId = Role.id;
    const user = await userModelManager.findUserByEmail(email);
    if (!user) {
      return failureResponse(res, 'user does not exist', NOT_FOUND_CODE);
    }
    const result = await user.addRoles(roleId);
    if (!result[0]) {
      return failureResponse(res, 'user already assigned a role', CONFLICT_CODE);
    }
    return successResponse(res, ROLE_ASSIGNED, OK_CODE, result);
  } catch (error) {
    return serverFailure(res);
  }
}

/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @returns {*} *
 */
async function getUserRoles(req, res) {
  try {
    const { id } = req.params;
    const user = await userModelManager.findUser('id', id);
    if (!user) {
      return successResponse(res, 'user is not found', OK_CODE);
    }
    const result = await user.getRoles();
    if (!result[0]) {
      return successResponse(res, 'no role found', OK_CODE);
    }
    return successResponse(res, OPERATION_SUCCESSFUL, OK_CODE, result);
  } catch (error) {
    return serverFailure(res);
  }
}

/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @returns {*} *
 */
async function deleteUserRole(req, res) {
  try {
    const { userId, roleId } = req.params;
    const deletedRole = await userRoleManager.deleteUserRole(userId, roleId);
    return successResponse(res, OPERATION_SUCCESSFUL, OK_CODE, deletedRole);
  } catch (error) {
    return serverFailure(res);
  }
}
module.exports = {
  assignRoleToUser,
  getUserRoles,
  deleteUserRole
};
