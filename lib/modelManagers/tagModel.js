const { Op } = require('sequelize');
const { Tags } = require('../../database/models');
/**
 * Declares Tag model manager class.
 * Tag model manager class contains equivalent queries that can be performed on the tag model.
 */
class TagModelManager {
  /**
   *
   *
   * @static
   * @param {object} tag
   * @returns {array} tag
   *
   * @memberOf Tag
   */
  static async findOrCreateTag(tag) {
    const createdTag = await Tags.findOrCreate({
      where: {
        tagName: tag
      },
      defaults: {
        tagName: tag
      }
    })
      .spread(theTags => theTags);
    return createdTag;
  }

  /**
   *
   * @param {id} tag
   * @static
   * @memberof Tag
   * @returns {Array} a tag array
   */
  static async getTag(tag) {
    const findAllTag = await Tags.findAll({
      where: {
        tagName: {
          [Op.iLike]: `${tag}%`,
        }
      }
    });
    return findAllTag;
  }
}
module.exports = TagModelManager;
