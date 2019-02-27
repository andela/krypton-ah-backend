const ReadStatsModelManager = require('../lib/modelManagers/readStatModel'),
  { successResponse, failureResponse } = require('../lib/utils/helper_function'),
  { formatUserReadStat } = require('../lib/utils/helpers'),
  {
    SERVER_ERROR_CODE,
    GET_USER_READSTAT_FAILED,
    GET_USER_READSTAT_SUCCESS
  } = require('../constants');

const getUserReadStatController = async (req, res) => {
  const readerId = req.decodedToken.payLoad.id;
  try {
    const userReadStat = await ReadStatsModelManager.getReadStat({ readerId });
    const data = formatUserReadStat(userReadStat);
    return successResponse(res, GET_USER_READSTAT_SUCCESS, data);
  } catch (error) {
    return failureResponse(res, GET_USER_READSTAT_FAILED, SERVER_ERROR_CODE);
  }
};

module.exports = { getUserReadStatController };
