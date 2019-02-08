const Comment = require('../modelManagers/articlesComment');

/**
 *
 * @description get original Id
 * @param {object} commentDetails
 * @returns {string} originalId
 */

const getOriginalId = (commentDetails) => {
  let originalId = '';
  if (commentDetails.originalId) {
    ({ originalId } = commentDetails);
  } else {
    originalId = commentDetails.id;
  }
  return originalId;
};

/**
 *main comment Id of threads
 * @param {object} commentDetails
 * @param {object} newComment
 * @param {string} commentId
 * @returns {promise}
 */

const updateMainCommentId = async (commentDetails, newComment, commentId) => {
  if (!commentDetails.mainCommentId) {
    await Comment.updateAllCommentThreads({
      mainCommentId: newComment.id
    }, commentId);
  }
};

module.exports = {
  getOriginalId,
  updateMainCommentId
};
