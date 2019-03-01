const { Op } = require('sequelize');

const { successResponse } = require('../../lib/utils/messageHandler');
const { OK_CODE, ARTICLE_FOUND_MESSAGE } = require('../../constants');

const filterNullFromObject = obj => Object.keys(obj).reduce((update, key) => {
  if (obj[key]) {
    update[key] = obj[key];
  }
  return update;
}, {});

const getUserProfileFromRequest = req => filterNullFromObject(req.body);

const getUserIdFromReqDecodedToken = req => req.decodedToken.payLoad.id;

const formatUserReadStat = (readStats) => {
  let userReadStat = {
    totalRead: 0,
    totalNumberOfArticlesRead: readStats.length,
    articlesRead: []
  };
  if (readStats.length > 0) {
    userReadStat = readStats.reduce((readStatObj, readStatInstance) => {
      readStatObj.totalRead += readStatInstance.readStat;
      readStatObj.articlesRead.push({
        id: readStatInstance.articleId,
        title: readStatInstance.article.title,
        description: readStatInstance.article.description,
        numberOfTimesViewed: readStatInstance.readStat
      });
      return readStatObj;
    }, userReadStat);
  }
  return userReadStat;
};

const getTokenFromReq = req => req.body.token
|| req.query.token
|| req.headers.authorization
|| req.params.token;

const articleByAuthorWhere = (value) => {
  const authorName = value.split(' ');
  if (authorName.length === 2) {
    const authorWhere = {
      [Op.or]: [
        {
          firstname: {
            [Op.iLike]: `%${authorName[0]}%`
          },
          lastname: {
            [Op.iLike]: `%${authorName[1]}%`
          }
        },
        {
          firstname: {
            [Op.iLike]: `%${authorName[1]}%`
          },
          lastname: {
            [Op.iLike]: `%${authorName[0]}%`
          }
        }
      ]
    };
    return authorWhere;
  }
  const authorWhere = {
    [Op.or]: [
      {
        firstname: {
          [Op.iLike]: `%${authorName}%`
        }
      },
      {
        lastname: {
          [Op.iLike]: `%${authorName}%`
        }
      }
    ]
  };
  return authorWhere;
};

const articleByTagWhere = (value) => {
  const tagWhere = {
    tagName: {
      [Op.iLike]: `%${value}%`
    }
  };
  return tagWhere;
};
const articleByTitleWhere = (value) => {
  const titleWhere = {
    title: {
      [Op.iLike]: `%${value}%`
    }
  };
  return titleWhere;
};

const articleByCategoryWhere = (value) => {
  const categoryWhere = {
    category: {
      [Op.iLike]: `%${value}%`
    }
  };
  return categoryWhere;
};

const articleBykeywordWhere = (value) => {
  const keywordWhere = {
    [Op.or]: [
      {
        title: {
          [Op.iLike]: `%${value}%`
        }
      },
      {
        description: {
          [Op.iLike]: `%${value}%`
        }
      },
      {
        content: {
          [Op.iLike]: `%${value}%`
        }
      }
    ]
  };
  return keywordWhere;
};

const searchResult = (foundArticles, res) => {
  const data = {};
  data.articles = foundArticles;
  return successResponse(res, ARTICLE_FOUND_MESSAGE, OK_CODE, data);
};


module.exports = {
  filterNullFromObject,
  getUserProfileFromRequest,
  formatUserReadStat,
  getTokenFromReq,
  articleByTitleWhere,
  articleByAuthorWhere,
  articleByTagWhere,
  articleBykeywordWhere,
  searchResult,
  articleByCategoryWhere,
  getUserIdFromReqDecodedToken
};
