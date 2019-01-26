const { UNSUCCESSFUL, SUCCESSFUL } = require('../../constants/index');
/**
 *
 * @param {Boolean} isverified - verification status
 * @returns {Boolean}- true or false bases on user verification status
 *
 */

const isVerified = isverified => (isverified ? SUCCESSFUL : UNSUCCESSFUL);

module.exports = isVerified;
