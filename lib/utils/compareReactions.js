let like;
const { LIKE } = require('../../constants');
/**
 *
 *
 * @static
 * @param {string} newReaction
 * @param {boolean} existingReaction
 * @returns {boolean} true or false
 * @memberof commentsReactionModel
 */
const compareReactions = (newReaction, existingReaction) => {
  if (newReaction === LIKE) {
    like = true;
  } else {
    like = false;
  }
  return like === existingReaction;
};

module.exports = compareReactions;
