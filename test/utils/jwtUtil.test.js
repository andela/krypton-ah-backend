const chai = require('chai');
const jwtUtil = require('../../lib/utils/jwtUtil');

const { expect } = chai;
const expirationTime = '1h',
  userId = 'd4d6884c-ed49-4158-99cd-6305af05a4a6';
let token, verifiedToken;

describe('Test for creation and verification of token', () => {
  it('Should have methods to generate and verify token', () => {
    expect(jwtUtil.generateToken).to.be.a('function');
    expect(jwtUtil.verifyToken).to.be.a('function');
  });

  it('should return generated token and decode the token', () => {
    expect(expirationTime).to.be.a('string');
    expect(userId).to.be.a('string');

    token = jwtUtil.generateToken(expirationTime, userId);
    verifiedToken = jwtUtil.verifyToken(token);

    expect(token).to.be.a('string');
    expect(verifiedToken).to.be.an('object');
    expect(verifiedToken).to.have.property('payLoad');
    expect(verifiedToken).to.have.property('iat');
    expect(verifiedToken).to.have.property('exp');
  });
});
