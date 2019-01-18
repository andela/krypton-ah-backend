const { UNSUCCESSFUL, SUCCESSFUL } = require('../../constants/index');
/**
 *
 * @param {Boolean} isverified - verification status
 * @returns {Boolean}- true or false bases on user verification status
 *
 */

const isVerified = (isverified) => {
  if (isverified) {
    return SUCCESSFUL;
  } return UNSUCCESSFUL;
};

module.exports = isVerified;
