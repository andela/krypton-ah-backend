const RoleManager = require('../lib/modelManagers/roleManager'),
  { successResponse, failureResponse, serverFailure } = require('../lib/utils/messageHandler'),
  {
    ROLE_CREATED,
    RESOURCE_CREATED_CODE,
    ROLE_ALREADY_EXIST,
    CONFLICT_CODE,
    OPERATION_SUCCESSFUL,
    NO_RECORD_FOUND,
    NOT_FOUND_CODE,
    OK_CODE
  } = require('../constants/index');

/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @returns {*} *
 */
async function createRole(req, res) {
  const { role } = req.body;
  try {
    const record = await RoleManager.findRole('role', req.body.role);
    if (record) {
      return failureResponse(res, ROLE_ALREADY_EXIST, CONFLICT_CODE);
    }
    const newRole = await RoleManager.createRole(role);
    return successResponse(res, ROLE_CREATED, RESOURCE_CREATED_CODE, newRole);
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
async function findRole(req, res) {
  const { id } = req.params;
  try {
    const record = await RoleManager.findRole('id', id);
    if (!record) {
      return failureResponse(res, NO_RECORD_FOUND, NOT_FOUND_CODE);
    }
    return successResponse(res, OPERATION_SUCCESSFUL, OK_CODE, record);
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
async function findAllRole(req, res) {
  try {
    const record = await RoleManager.findAllRoles();
    return successResponse(res, OPERATION_SUCCESSFUL, OK_CODE, record);
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
async function updateRole(req, res) {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const record = await RoleManager.findRole('id', id);
    if (!record[0]) {
      return failureResponse(res, NO_RECORD_FOUND, NOT_FOUND_CODE);
    }
    const updatedRole = await RoleManager.updateRole(id, { role });
    return successResponse(res, OPERATION_SUCCESSFUL, OK_CODE, updatedRole);
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
async function deleteRole(req, res) {
  try {
    const { id } = req.params;
    const record = await RoleManager.deleteRole(id);
    return successResponse(res, OPERATION_SUCCESSFUL, OK_CODE, record);
  } catch (error) {
    return serverFailure(res);
  }
}

module.exports = {
  createRole,
  findRole,
  findAllRole,
  updateRole,
  deleteRole
};
