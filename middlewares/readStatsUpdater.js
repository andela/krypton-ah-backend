const ReadStatsManager = require('../lib/modelManagers/readStatModel');

const readStatUpdater = async (req, res, next) => {
  const readerId = req.decodedToken.payLoad;
  const { articleId } = req.params;
  if (readerId && articleId) {
    const readStats = await ReadStatsManager.getReadStat({ readerId, articleId });
    if (readStats.length === 1) {
      ReadStatsManager.updateReadStat({
        articleId,
        userId: readerId,
        readStat: readStats[0].readStat + 1
      });
    } else {
      await ReadStatsManager.createReadStat({ userId: readerId, articleId });
    }
  }
  next();
};


module.exports = readStatUpdater;
