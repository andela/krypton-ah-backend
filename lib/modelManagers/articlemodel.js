const { Articles, User, userprofile } = require('../../database/models');

/**
 *
 *
 * @class articleModelManager
 */
class articleModelManager {
  /**
  *
  *
  * @static
  * @param {*} articleData
  * @returns {*} createdArticle
  * @memberof articleModelManager
  */
  static async createArticle(articleData) {
    const createdArticle = await Articles.create({
      title: articleData.title,
      description: articleData.description,
      content: articleData.content,
      featuredImageUrl: articleData.featuredImageUrl,
      averageRating: articleData.averageRating,
      slug: articleData.slug,
      readTime: articleData.readTime,
      authorId: articleData.authorId
    });
    return createdArticle;
  }

  /**
 *
 *
 * @static
 * @param {object} field Culumn(s) to be updated
 * @param {object} id
 * @param {object} transaction Optional for transactions.
 * @returns {*} updatedArticle
 * @memberof articleModelManager
 */
  static async updateArticle(field = { }, id, transaction = { }) {
    const updatedArticle = await Articles.update(
      field,
      {
        where: { id },
        returning: true
      }, transaction

    );
    return updatedArticle;
  }

  /**
 *
 *
 * @static
 * @param {*} id
 * @returns {*} deletedArticle
 * @memberof articleModelManager
 */
  static async deleteArticle(id) {
    const deletedArticle = Articles.destroy({
      where: {
        id
      }
    });
    return deletedArticle;
  }

  /**
 *
 *
 * @static
 * @param {columnName} columnName to be returned
 * @param {value} value
 * @param {limit} limit
 * @param {offset} offset
 * @memberof articleModelManager
 * @returns {*} authorsArticle
 */
  static async getArticlesby(columnName, value, limit, offset) {
    const options = {
      include: [{
        model: User,
        as: 'articleAuthor',
        include: [{
          model: userprofile,
          attributes: ['avatar']
        }],
        attributes: ['firstname', 'lastname']
      }],
      limit,
      offset
    };
    if (columnName) {
      options.where = { [columnName]: value };
      const returnedArticles = await Articles.findAll(options);
      return returnedArticles;
    }
    const returnedArticles = await Articles.findAll({ options });
    return returnedArticles;
  }
}


module.exports = articleModelManager;
