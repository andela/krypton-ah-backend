const ReportTagModelManager = require('../lib/modelManagers/reportTagModel'),
  ReportModelManager = require('../lib/modelManagers/reportModel'),
  {
    failureResponse,
    successResponse
  } = require('../lib/utils/helper_function'),
  {
    OK_CODE,
    RESOURCE_CREATED_CODE,
    REPORT_TAG_CREATED,
    RETRIEVED_REPORT_TAG,
    SERVER_ERROR_CODE,
    TAG_DELETED,
    SERVER_ERROR_MESSAGE,
    SEQUELIZE_UNIQUE_ERROR,
    CONFLICT_CODE,
    BAD_REQUEST_CODE,
    REPORT_TAG_IN_USE,
    NOT_FOUND_CODE,
    REPORT_TAG_NOT_FOUND,
    TAG_ALREADY_EXIST
  } = require('../constants/index'),
  pagination = require('../lib/utils/pagination/paginationHelper');
/**
 * @description - handle report tag
 *
 * @class ReportTagController
 */
class ReportTagController {
  /**
   * @description - handle creating of report tag
   *
   * @static
   * @param {any} req - Request Object
   * @param {any} res - Response Object
   * @returns {object} Returns the created tag
   *
   * @memberOf ReportTagController
   */
  static async createTag(req, res) {
    try {
      const { name } = req.body;
      const createdTag = await ReportTagModelManager.createReportTag(name);
      if (createdTag) {
        return successResponse(
          res,
          REPORT_TAG_CREATED,
          createdTag,
          RESOURCE_CREATED_CODE
        );
      }
    } catch (error) {
      if (error.name === SEQUELIZE_UNIQUE_ERROR) {
        return failureResponse(res, TAG_ALREADY_EXIST, CONFLICT_CODE);
      }
      return failureResponse(res, SERVER_ERROR_MESSAGE, SERVER_ERROR_CODE);
    }
  }

  /**
   * @description - handle retriving all report tags
   *
   * @static
   * @param {any} req Request object
   * @param {any} res Response obhect
   * @returns {object} Returns object of tags
   * @memberOf ReportTagController
   */
  static async getTags(req, res) {
    const { limit, offset } = pagination(req.query);
    try {
      const tags = await ReportTagModelManager.getAllReportTags(limit, offset);
      return successResponse(res, RETRIEVED_REPORT_TAG, tags, OK_CODE);
    } catch (error) {
      return failureResponse(res, SERVER_ERROR_MESSAGE, SERVER_ERROR_CODE);
    }
  }

  /**
 * @description - handle deleting report tag
 *
 * @static
 * @param {any} req
 * @param {any} res
 * @returns {null} no return
 *
 * @memberOf ReportTagController
 */
  static async deleteReportTag(req, res) {
    try {
      const { tagId } = req.params;
      const count = await ReportModelManager.getNumberOfReportTag(tagId);
      if (count === 0) {
        const deletedTag = await ReportTagModelManager.deleteTag(tagId);
        if (deletedTag) {
          return successResponse(res, TAG_DELETED, deletedTag, OK_CODE);
        }
        return failureResponse(res, REPORT_TAG_NOT_FOUND, NOT_FOUND_CODE);
      }
      return failureResponse(res, REPORT_TAG_IN_USE, BAD_REQUEST_CODE);
    } catch (error) {
      return failureResponse(res, SERVER_ERROR_MESSAGE, SERVER_ERROR_CODE);
    }
  }
}

module.exports = ReportTagController;
