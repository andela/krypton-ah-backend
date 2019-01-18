const chai = require('chai'),
  { expect } = chai,
  verificationStatus = require('../../lib/utils/verifiedUserUtil'),
  isVerified = true;

let status;

describe('Test to verify user status in database', () => {
  it('Should return true if status is true', () => {
    status = verificationStatus(isVerified);
    expect(status).to.be.a('boolean');
    expect(status).to.equal(true);
  });
  it('Should return false if status is false', () => {
    status = verificationStatus(!isVerified);
    expect(status).to.be.a('boolean');
    expect(status).to.equal(false);
  });
});
