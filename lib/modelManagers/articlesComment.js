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
   * @param {*} newComment
   * @memberof articlesComment
   * @returns {*} createdComment
   */
  static async createComment(newComment) {
    const createdComment = await ArticlesComments.create(newComment);
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
        articleId,
        updated: false,
        deleted: false
      },
      order: [['createdAt', 'ASC']],
      include: {
        model: ArticlesComments,
        as: 'threads',
        attributes: ['id']
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
   * @param {*} commentId
   * @returns {*} comments
   * @memberof articleComment
   */
  static async findComment(articleId, commentId) {
    const options = {
      where: {
        id: commentId,
        articleId,
        updated: false,
        deleted: false
      }
    };
    const comment = await ArticlesComments.findOne(options);
    return comment;
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
      },
      include: {
        model: ArticlesComments,
        as: 'threads',
        limit,
        offset,
        where: {
          articleId,
          updated: false,
          deleted: false
        },
        order: [['createdAt', 'ASC']],
      },
      attributes: ['id']
    };
    const comments = await ArticlesComments.findOne(options);
    return comments;
  }


  /**
 *
 *
 * @static
 * @param {object} field Culumn(s) to be updated
 * @param {object} commentId Id of comment to be updated
 * @returns {*} updatedArticleComment
 * @memberof articleModelManager
 */
  static async updateArticleComment(field = { }, commentId) {
    const updatedArticleComment = await ArticlesComments.update(
      field,
      {
        where: { id: commentId },
        returning: true
      }
    );
    return updatedArticleComment;
  }

  /**
 *
 *
 * @static
 * @param {object} field Culumn(s) to be updated
 * @param {object} commentId Id of comment to be updated
 * @returns {*} updatedArticleComment
 * @memberof articleModelManager
 */
  static async updateCommentThreads(field = { }, commentId) {
    const updatedArticleComment = await ArticlesComments.update(
      field,
      {
        where: { mainCommentId: commentId },
        returning: true
      }
    );
    return updatedArticleComment;
  }
}

module.exports = ArticleComment;
