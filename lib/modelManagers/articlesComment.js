const Sequelize = require('sequelize');
const { ArticlesComments } = require('../../database/models');

const { Op } = Sequelize;

/**
 * @description articlesComment Model Manager
 * @class articlesComment
 */
class ArticleComment {
  /**
   *
   * @description This method create articles comment
   * @static
   * @param {*} comment
   * @param {*} userId
   * @param {*} articleId
   * @param {*} mainCommentId
   * @memberof articlesComment
   * @returns {*} createdComment
   */
  static async createComment(comment, userId, articleId, mainCommentId) {
    const createdComment = await ArticlesComments.create({
      comment,
      userId,
      articleId,
      mainCommentId
    });
    return createdComment;
  }

  /**
   *
   *
   * @static
   * @param {*} articleId
   * @param {*} limit
   * @param {*} offset
   * @returns {*} comments
   * @memberof articleComment
   */
  static async findAllComment(articleId, limit, offset) {
    const options = {
      where: {
        mainCommentId: {
          [Op.eq]: null
        },
        articleId
      },
      include: {
        model: ArticlesComments,
        as: 'threads'
      },
      limit,
      offset
    };
    const comments = await ArticlesComments.findAll(options);
    return comments;
  }

  /**
   *
   *
   * @static
   * @param {*} articleId
   * @param {*} mainCommentId
   * @param {*} limit
   * @param {*} offset
   * @returns {*} *
   * @memberof articleComment
   */
  static async findCommentThreads(articleId, mainCommentId, limit, offset) {
    const options = {
      where: {
        id: {
          [Op.eq]: mainCommentId
        },
        articleId
      },
      include: {
        model: ArticlesComments,
        as: 'threads',
        limit,
        offset
      }
    };
    const comments = await ArticlesComments.findOne(options);
    return comments;
  }
}

module.exports = ArticleComment;
