const filterNullFromObject = obj => Object.keys(obj).reduce((update, key) => {
  if (obj[key]) {
    update[key] = obj[key];
  }
  return update;
}, {});

const getUserProfileFromRequest = req => filterNullFromObject(req.body);

const formatUserReadStat = (readStats) => {
  let userReadStat = {
    totalRead: 0,
    totalNumberOfArticlesRead: readStats.length,
    articlesRead: []
  };
  if (readStats.length > 0) {
    userReadStat = readStats.reduce((readStatObj, readStat) => {
      readStatObj.totalRead += readStat.readStat;
      readStatObj.articlesRead.push({
        id: readStat.articleId,
        title: readStat.article.title,
        description: readStat.article.description,
        numberOfTimesRead: readStat.readStat
      });
      return readStatObj;
    }, userReadStat);
  }
  return userReadStat;
};
module.exports = {
  filterNullFromObject,
  getUserProfileFromRequest,
  formatUserReadStat
};
