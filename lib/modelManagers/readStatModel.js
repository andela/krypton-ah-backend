const { ReadStats, Articles } = require('../../database/models');

/**
 * Declares read stats model manager class
 */
class ReadStatsManager {
  /**
   *
   * @param {object} newReadStat new read stat
   * @returns {object} created readStat
   */
  static async createReadStat(newReadStat) {
    const { articleId, userId } = newReadStat;
    const createdReadStat = await ReadStats.findOrCreate({
      where: {
        articleId,
        readerId: userId
      }
    });
    return createdReadStat;
  }

  /**
   *
   * @param {object} readStatUpdate new read stat
   * @returns {object} updated readStat
   */
  static async updateReadStat(readStatUpdate) {
    const { articleId, userId, readStat } = readStatUpdate;
    const updatedReadStat = await ReadStats.update(
      { readStat },
      {
        where: {
          articleId,
          readerId: userId
        },
        returning: true,
        plain: true
      }
    );
    return updatedReadStat;
  }

  /**
   *
   * @param {object} searchOptions readerId, articleId and readStat
   * @returns {object} readStat
   */
  static async getReadStat(searchOptions) {
    const options = {
      where: { ...searchOptions },
      include: [
        {
          model: Articles,
          as: 'article',
          attributes: ['title', 'description']
        }
      ]
    };
    const readStat = await ReadStats.findAll(options);
    return readStat;
  }

  /**
   * increases the the read stat by 1
   * @param {string} readerId
   * @param {string} articleId
   * @returns {*} *
   */
  static async readStatUpdater(readerId, articleId) {
    if (readerId && articleId) {
      const readStats = await this.getReadStat({ readerId, articleId });
      if (readStats.length === 1) {
        await this.updateReadStat({
          articleId,
          userId: readerId,
          readStat: readStats[0].readStat + 1
        });
      } else {
        await this.createReadStat({ userId: readerId, articleId });
      }
    }
  }
}

module.exports = ReadStatsManager;
