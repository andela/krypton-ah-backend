const ReportModelManager = require('../lib/modelManagers/reportModel'),
  {
    failureResponse,
    successResponse
  } = require('../lib/utils/helper_function'),
  {
    OK_CODE,
    RESOURCE_CREATED_CODE,
    SERVER_ERROR_CODE,
    RETRIEVED_REPORT,
    REPORT_CREATED,
    RESOLVED_REPORT,
    UPDATE_ERROR_MESSAGE,
    NOT_FOUND_CODE,
    NO_REPORT_FOUND,
    REPORT_REOPEN,
    SERVER_ERROR_MESSAGE
  } = require('../constants/index'),
  pagination = require('../lib/utils/pagination/paginationHelper');
/**
 * @description - handles report
 *
 * @class ReportController
 */
class ReportController {
  /**
   * @description - handle create report
   *
   * @static
   * @param {any} req Request Object
   * @param {any} res Response Object
   * @returns {object} - Returns created report
   * @memberOf ReportController
   */
  static async createAReport(req, res) {
    try {
      const { articleId } = req.params;
      const userId = req.decodedToken.payLoad;
      const {
        reportTagId, message
      } = req.body;

      const reportData = {
        userId,
        articleId,
        reportTagId,
        message
      };
      const createdReport = await ReportModelManager.createReport(reportData);
      if (createdReport) {
        return successResponse(res, REPORT_CREATED, createdReport, RESOURCE_CREATED_CODE);
      }
    } catch (error) {
      return failureResponse(res, SERVER_ERROR_MESSAGE, SERVER_ERROR_CODE);
    }
  }

  /**
 * @description - handles get all tags
 *
 * @static
 * @param {any} req Request Object
 * @param {any} res Response Object
 * @returns {Object} returns object of reports
 * @memberOf ReportController
 */
  static async getReports(req, res) {
    const { limit, offset } = pagination(req.query);
    try {
      const reports = await ReportModelManager.getAllReports(limit, offset);
      if (reports) {
        return successResponse(res, RETRIEVED_REPORT, reports, OK_CODE);
      }
      return failureResponse(res, NO_REPORT_FOUND, NOT_FOUND_CODE);
    } catch (error) {
      return failureResponse(res, SERVER_ERROR_MESSAGE, SERVER_ERROR_CODE);
    }
  }

  /**
   * @description - handles report update
   *
   * @static
   * @param {any} req Request Object
   * @param {any} res Response Object
   * @returns {object} Returns updated report
   *
   * @memberOf ReportController
   */
  static async resolveReport(req, res) {
    const { id } = req.params;
    const { resolved } = req.body;
    try {
      const status = await ReportModelManager.updateReport(id, resolved);
      if (status) {
        if (req.body.resolved === true) {
          return successResponse(res, RESOLVED_REPORT, status, OK_CODE);
        }
        return successResponse(res, REPORT_REOPEN, status, OK_CODE);
      }
      return failureResponse(res, UPDATE_ERROR_MESSAGE, NOT_FOUND_CODE);
    } catch (error) {
      return failureResponse(res, SERVER_ERROR_MESSAGE, SERVER_ERROR_CODE);
    }
  }

  /**
 * @description - handles getting a single report
 *
 * @static
 * @param {any} req Request Object
 * @param {any} res Response Object
 * @returns {object} Return a single report
 *
 * @memberOf ReportController
 */
  static async getReport(req, res) {
    const { id } = req.params;
    try {
      const report = await ReportModelManager.getReportById(id);
      if (report) {
        return successResponse(res, RETRIEVED_REPORT, report, OK_CODE);
      }
      return failureResponse(res, NO_REPORT_FOUND, NOT_FOUND_CODE);
    } catch (error) {
      return failureResponse(res, SERVER_ERROR_MESSAGE, SERVER_ERROR_CODE);
    }
  }
}

module.exports = ReportController;
