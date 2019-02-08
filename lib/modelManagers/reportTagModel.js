const { ReportTag } = require('../../database/models');

/**
 * @description - Handle report tags
 *
 * @class ReportTagModelManager
 */
class ReportTagModelManager {
/**
 * @description - handle create tag
 *
 * @static
 * @param {any} name tag name
 * @returns {object} return an object
 *
 * @memberOf ReportTagModelManager
 */
  static async createReportTag(name) {
    const createdReportTag = await ReportTag.create({
      name
    });
    return createdReportTag;
  }

  /**
   * @description - handles report tags
   *
   * @static
   * @param {any} limit - report tag limit
   * @param {any} offset  - report tag offset
   * @returns {object} - return all report tags
   *
   * @memberOf ReportTagModelManager
   */
  static async getAllReportTags(limit, offset) {
    const getReportTags = await ReportTag.findAll({
      limit,
      offset
    });
    return getReportTags;
  }

  /**
 * @description - handle delete a report tag
 *
 * @static
 * @param {any} id id of the tag to be deleted
 * @returns {null} No return
 *
 * @memberOf ReportTagModelManager
 */
  static async deleteTag(id) {
    const deletedTag = await ReportTag.destroy({
      where: {
        id
      }
    });
    return deletedTag;
  }
}

module.exports = ReportTagModelManager;
