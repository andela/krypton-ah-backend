const {
  Articles,
  User,
  userprofile,
  Tags,
  ArticlesReactions,
  ArticlesComments,
  ReadStats
} = require('../../database/models');

const includeUser = {
  model: User,
  as: 'articleAuthor',
  include: [
    {
      model: userprofile,
      attributes: ['avatar']
    }
  ],
  where: {},
  attributes: ['firstname', 'lastname']
};

const includeTag = {
  model: Tags,
  as: 'tags',
  attributes: ['tagName'],
  through: { attributes: [] }
};

const includeReactions = {
  model: ArticlesReactions,
};

const includeComments = {
  model: ArticlesComments,
};

const includeStats = {
  model: ReadStats,
  required: true
};

const searchAttribute = {
  attributes: ['id', 'title', 'description', 'category', 'slug', 'numberOfReviews', 'createdAt', 'featuredImageUrl']
};


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
      category: articleData.category,
      authorId: articleData.authorId,
      isPublished: articleData.ispublished
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
  static async updateArticle(field = {}, id, transaction = {}) {
    const updatedArticle = await Articles.update(
      field,
      {
        where: { id },
        returning: true
      },
      transaction
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
   * @param {columnName} columnNames to be returned
   * @param {value} values
   * @param {limit} limit
   * @param {offset} offset
   * @memberof articleModelManager
   * @returns {*} authorsArticle
   */
  static async getArticlesby(columnNames, values, limit, offset) {
    const options = {
      include: [includeUser, includeTag],
      limit,
      offset
    };
    if (columnNames) {
      if (typeof columnNames === 'string') {
        options.where = { [columnNames]: values };
      } else {
        options.where = columnNames.reduce((initialValue, columnName, index) => {
          initialValue[columnName] = values[index];
          return initialValue;
        }, {});
      }
      const returnedArticles = await Articles.findAll(options);
      return returnedArticles;
    }
    const returnedArticles = await Articles.findAll(options);
    return returnedArticles;
  }

  /**
   *
   *
   * @static
   * @param {where} where
   * @param {value} value
   * @param {limit} limit
   * @param {offset} offset
   * @memberof articleModelManager
   * @returns {object} Articles by title
   */
  static async getArticlesByTitle(where, value, limit, offset) {
    const options = {
      include: [includeUser, includeTag],
      limit,
      offset
    };
    options.where = where;
    options.attributes = searchAttribute.attributes;
    const returnedArticles = await Articles.findAll(options);
    return returnedArticles;
  }

  /**
   *
   *
   * @static
   * @param {where} where
   * @param {value} value
   * @param {limit} limit
   * @param {offset} offset
   * @memberof articleModelManager
   * @returns {object} Articles by author
   */
  static async getArticlesByAuthor(where, value, limit, offset) {
    const options = {
      include: [{ ...includeUser, where }, includeTag],
      limit,
      offset
    };
    options.attributes = searchAttribute.attributes;
    const returnedArticles = await Articles.findAll(options);
    return returnedArticles;
  }


  /**
   *
   *
   * @static
   * @param {where} where
   * @param {value} value
   * @param {limit} limit
   * @param {offset} offset
   * @memberof articleModelManager
   * @returns {object} Articles by tags
   */
  static async getArticlesByTag(where, value, limit, offset) {
    const options = {
      include: [{ ...includeTag, where }, includeUser],
      limit,
      offset
    };
    options.attributes = searchAttribute.attributes;
    const returnedArticles = await Articles.findAll(options);
    return returnedArticles;
  }


  /**
   *
   *
   * @static
   * @param {where} where
   * @param {value} value
   * @param {limit} limit
   * @param {offset} offset
   * @memberof articleModelManager
   * @returns {object} Articles by keyword
   */
  static async getArticlesByKeyword(where, value, limit, offset) {
    const options = {
      include: [includeUser, includeTag],
      limit,
      offset
    };
    options.where = where;
    options.attributes = searchAttribute.attributes;
    const returnedArticles = await Articles.findAll(options);
    return returnedArticles;
  }

  /**
   *
   *
   * @static
   * @param {where} where
   * @param {value} value
   * @param {limit} limit
   * @param {offset} offset
   * @memberof articleModelManager
   * @returns {object} Articles by keyword
   */
  static async getArticlesByCategory(where, value, limit, offset) {
    const options = {
      include: [includeUser, includeTag],
      limit,
      offset
    };
    options.where = where;
    options.attributes = searchAttribute.attributes;
    const returnedArticles = await Articles.findAll(options);
    return returnedArticles;
  }

  /**
  *
  *
  * @static
  * @param {limit} limit
  * @param {offset} offset
  * @memberof articleModelManager
  * @returns {object} Articles by keyword
  */
  static async filterPopularArticles(limit, offset) {
    const options = {
      include: [includeReactions, includeComments, includeStats],
      limit,
      offset
    };
    options.attributes = searchAttribute.attributes;
    const returnedArticles = await Articles.findAll(options);
    return returnedArticles;
  }
}

module.exports = articleModelManager;
