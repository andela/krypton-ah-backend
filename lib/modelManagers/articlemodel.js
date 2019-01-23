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
  * @param {*} req
  * @returns {*} createdArticle
  * @memberof articleModelManager
  */
  static async createArticle(req) {
    const createdArticle = await Articles.create({
      title: req.title,
      description: req.description,
      content: req.content,
      featuredImageUrl: req.featuredImageUrl,
      averageRating: req.averageRating,
      slug: req.slug,
      readTime: req.readTime,
      authorId: req.authorId
    });
    return createdArticle;
  }

  /**
 *
 *
 * @static
 * @param {*} req
 * @param {*} id
 * @returns {*} updatedArticle
 * @memberof articleModelManager
 */
  static async updateArticle(req, id) {
    const updatedArticle = await Articles.update(
      {
        title: req.title,
        description: req.description,
        content: req.content,
        featuredImageUrl: req.featuredImageUrl,
        averageRating: req.averageRating,
        slug: req.Slug,
        readTime: req.readTime,
      },
      {
        where: { id },
        returning: true
      },

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
