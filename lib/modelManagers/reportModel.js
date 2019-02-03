const {
  Reports,
  User,
  Articles,
  ReportTag
} = require('../../database/models');

/**
 * @description handle reporting articles
 *
 * @class ReportModelManager
 */
class ReportModelManager {
/**
 * @description create a new report
 *
 * @static
 * @param {any} reportData Report data to be created
 * @returns {null} no return
 *
 * @memberOf ReportModelManager
 */
  static async createReport(reportData) {
    const createdReport = await Reports.create({
      userId: reportData.userId,
      articleId: reportData.articleId,
      reportTagId: reportData.reportTagId,
      message: reportData.message
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
    const allReports = await Reports.findAll({
      limit,
      offset,
      include: [
        {
          model: User,
          as: 'reporter',
          attributes: ['firstname', 'lastname']
        },
        {
          model: ReportTag,
          as: 'tag',
          attributes: ['name']
        },

      ]
    });
    return allReports;
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
  static async getReportById(id) {
    const getAReport = await Reports.findOne({
      where: {
        id
      },
      include: [
        {
          model: User,
          as: 'reporter',
          attributes: ['firstname', 'lastname']
        },
        {
          model: Articles,
          as: 'userArticle',
          attributes: ['title', 'description', 'content']
        },
        {
          model: ReportTag,
          as: 'tag',
          attributes: ['name']
        }
      ]
    });
    return getAReport;
  }

  /**
   * @description Handles update report
   *
   * @static
   * @param {any} id - Report id
   * @param {any} status - Report status
   * @returns {integer} - return an integer
   *
   * @memberOf ReportModelManager
   */
  static async updateReport(id, status) {
    const updated = await Reports.update(
      {
        resolved: status
      },
      {
        where: {
          id
        }
      }
    );
    return updated;
  }

  /**
 * @descritpion handles number of occurence of report Tag id
 *
 * @static
 * @param {any} id Report Tag Id
 * @returns {integer} Returns counts
 * @memberOf ReportModelManager
 */
  static async getNumberOfReportTag(id) {
    const countId = await Reports.count({
      where: {
        reportTagId: id
      }
    });
    return countId;
  }
}

module.exports = ReportModelManager;
