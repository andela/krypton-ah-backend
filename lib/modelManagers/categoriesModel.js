const { Op } = require('sequelize');
const {
  categories, Articles
} = require('../../database/models');

/**
 *
 *
 * @class categoryModelManager
 */
class categoryModelManager {
  /**
   *
   *
   * @static
   * @param {*} category
   * @returns {*} object
   * @memberof categories
   */
  static async createCategory(category) {
    const createdCategory = categories.findOrCreate({
      where: {
        category
      },
    });
    return createdCategory;
  }

  /**
     *
     *
     * @static
     * @param {*} category
     * @returns {*} object
     * @memberof categoryModelManager
     */
  static async deleteCategory(category) {
    const deletedCategory = categories.destroy({
      where: { category }
    });
    return deletedCategory;
  }

  /**
       *
       *
       * @static
       * @param {*} category
       * @returns {*} object
       * @memberof categoryModelManager
       */
  static async getCategory(category) {
    const Category = categories.findAll({
      where: {
        category: {
          [Op.iLike]: `${category}%`
        }
      }
    });
    return Category;
  }

  /**
       *
       *
       * @static
       * @param {*} limit
       * @param {*} offset
       * @param {*} category
       * @returns {*} object
       * @memberof categoryModelManager
       */
  static async getAllCategories(limit, offset) {
    const Category = await categories.findAll({
      include: {
        model: Articles,
        attributes: ['id', 'title']
      },
      attributes: ['id', 'category'],
      limit,
      offset
    });
    return Category;
  }
}

module.exports = categoryModelManager;
