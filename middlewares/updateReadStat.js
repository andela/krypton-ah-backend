const ReadStatsManager = require('../lib/modelManagers/readStatModel');

const updateReadStat = async (req) => {
  let readerId;
  if (req.decodedToken) {
    readerId = req.decodedToken.payLoad;
  }
  const { authorId } = req;
  if (readerId && (authorId !== readerId)) {
    await ReadStatsManager.readStatUpdater(readerId, req.params.id);
  }
};

module.exports = updateReadStat;
