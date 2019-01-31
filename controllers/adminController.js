const userRoleManager = require('../lib/modelManagers/userRoleManager');
const { successResponse, failureResponse, serverFailure } = require('../lib/utils/messageHandler');
const {
  ROLE_CREATED,
  RESOURCE_CREATED_CODE,
  ROLE_ALREADY_EXIST,
  BAD_REQUEST_CODE
} = require('../constants/index');

// /**
//  *
//  *
//  * @param {*} req
//  * @param {*} res
//  * @returns {*} *
//  */
// async function findAdminController(req, res) {
//   try {
//     const { id } = req.decodedToken.payLoad;
//     const admin = await userRoleManager.findUserRole(id);
//     successResponse(res, SUCCESS_MESSAGE, OK_CODE, admin);
//   } catch (error) {
//     serverFailure(res);
//   }
// }

/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @returns {*} *
 */
async function createRoleController(req, res) {
  const { role } = req.body;
  try {
    const record = await userRoleManager.findRole(role);
    if (record) {
      return failureResponse(res, ROLE_ALREADY_EXIST, BAD_REQUEST_CODE);
    }
    const newRole = await userRoleManager.createAdminRole(role);
    return successResponse(res, ROLE_CREATED, RESOURCE_CREATED_CODE, newRole);
  } catch (error) {
    return serverFailure(res);
  }
}
module.exports = { createRoleController };
