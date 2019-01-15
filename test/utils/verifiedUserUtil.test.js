const chai = require('chai'),
  { expect } = chai;
const verificationStatus = require('../../lib/utils/verifiedUserUtil');

describe('Test to verify user status in database', () => {
  const isVerified = true;
  it('Should return true if status is true', () => {
    const status = verificationStatus(isVerified);
    expect(status).to.equal(true);
  });
  it('Should return false if status is false', () => {
    const status = verificationStatus(!isVerified);
    expect(status).to.equal(false);
  });
});
