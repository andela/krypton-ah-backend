require('dotenv').config();
const User = require('../lib/modelManagers/usermodel');
const { generateToken } = require('../lib/utils/jwtUtil');
const {
  successResponse,
  failureResponse,
  serverFailure,
  redirect,
} = require('../lib/utils/messageHandler');
const {
  BAD_REQUEST_CODE,
  OK_CODE,
  ACCOUNT_ACTIVATED,
  ALREADY_ACTIVATED_ERROR,
  TOKEN_TIMESPAN,
} = require('../constants');
/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @returns {object} response object based on the user account verification operation.
 */
const verifyNewUser = async (req, res) => {
  const uuid = req.decodedToken.payLoad;
  const { callbackUrl } = req.query;
  const findUser = await User.getUser(uuid);

  if (callbackUrl) {
    if (findUser.isverified === true) {
      return redirect(res, callbackUrl);
    }
    const field = { isverified: true };
    const payLoad = uuid;
    const data = {};
    data.token = await generateToken(TOKEN_TIMESPAN, payLoad);
    const callbackUrlData = `${callbackUrl}?token=${data.token}`;
    try {
      const updatedUser = await User.update(uuid, field);
      if (updatedUser) {
        return redirect(res, callbackUrlData);
      }
    } catch (err) {
      return serverFailure(res);
    }
  }

  if (findUser.isverified === true) {
    return failureResponse(res, ALREADY_ACTIVATED_ERROR, BAD_REQUEST_CODE);
  }
  const field = { isverified: true };
  const payLoad = uuid;
  const data = {};
  data.token = await generateToken(TOKEN_TIMESPAN, payLoad);

  try {
    const updatedUser = await User.update(uuid, field);
    if (updatedUser) {
      return successResponse(res, ACCOUNT_ACTIVATED, OK_CODE, data);
    }
  } catch (err) {
    return serverFailure(res);
  }
};
module.exports = verifyNewUser;
