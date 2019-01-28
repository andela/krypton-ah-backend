const { Reports } = require('../../database/models');

/**
 * @description handle reporting articles
 *
 * @class ReportModelManager
 */
class ReportModelManager {
/**
 * @description handles creating a report
 *
 * @static
 * @param {any} userId - Reporter id
 * @param {any} articleId - Article Id
 * @param {any} reportTagId reportTag Id
 * @param {any} message - reporter message
 * @returns {object} return report
 *
 * @memberOf ReportModelManager
 */
  static async create(userId, articleId, reportTagId, message) {
    const createdReport = await Reports.create({
      userId,
      articleId,
      reportTagId,
      message
    });
    return createdReport;
  }

  /**
 * @description get all reports
 *
 * @static
 * @param {any} limit pagination limit
 * @param {any} offset pagination offset
 * @returns {Object} return all reports
 *
 * @memberOf ReportModelManager
 */
  static async getAllReports(limit, offset) {
    const getAllReports = await Reports.findAll({
      limit,
      offset
    });
    return getAllReports;
  }

  /**
   * @description get a single report
   *
   * @static
   * @param {any} id article id
   * @returns {Object} return a single report
   *
   * @memberOf ReportModelManager
   */
  static async getReportBy(id) {
    const getAReport = await Reports.findOne({
      where: {
        articleId: id
      }
    });
    return getAReport;
  }
}

module.exports = ReportModelManager;
