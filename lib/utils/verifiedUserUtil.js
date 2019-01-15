/**
 *
 * @param {Boolean} isverified - verification status
 * @returns {Boolean}- true or false bases on user verification status
 *
 */

const isVerified = (isverified) => {
  if (isverified) {
    return true;
  }
  if (!isverified) {
    return false;
  }
};

module.exports = isVerified;
