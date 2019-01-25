const { AVERAGE_READ_TIME } = require('../../constants');

/**
 *
 * @param {string} content Article content
 * @returns {number} time to read the content
 */

const readTimeCalculator = (content) => {
  const numberOfWords = content.split(' ').length;
  return Math.ceil(numberOfWords / AVERAGE_READ_TIME);
};

module.exports = readTimeCalculator;
