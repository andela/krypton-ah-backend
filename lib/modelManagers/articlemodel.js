const { article, userprofile } = require('../../database/models');
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
  * @param {*} title
  * @param {*} description
  * @param {*} content
  * @param {*} featuredImageUrl
  * @param {*} Slug
  * @param {*} readTime
  * @param {*} averageRating
  * @param {*} id
  * @returns {*} createdArticle
  * @memberof articleModelManager
  */
  static async createArticle(title, description,
    content, featuredImageUrl,
    Slug, readTime, averageRating, id) {
    const createdArticle = await article.create({
      Title: title,
      Description: description,
      Content: content,
      featuredImageUrl,
      averageRating,
      Slug,
      readTime,
      authorId: id
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
    const updatedArticle = await article.update(
      {
        Title: req.title || article.Title,
        Description: req.Description || article.Description,
        Slug: req.Slug || article.Slug,
        Content: req.content || article.Content,
        readTime: req.readTime || article.readTime,
        featuredImageUrl: req.featuredImageUrl || article.featuredImageUrl,
        averageRating: req.averageRating || article.averageRating,
      },
      {
        where: { id }
      }
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
    const deletedArticle = article.destroy({
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
 * @memberof articleModelManager
 * @returns {*} authorsArticle
 */
  static async getArticle(columnName, value) {
    const authorsArticle = article.findAll(
      {
        where: { [columnName]: value },
        include: [{
          model: userprofile,
          as: 'author',
          attributes: ['username', 'avatar', 'bio']
        }]
      }
    );

    return authorsArticle;
  }
}

module.exports = articleModelManager;
