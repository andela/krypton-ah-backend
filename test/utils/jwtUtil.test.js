const chai = require('chai'),
  jwtUtil = require('../../lib/utils/jwtUtil'),
  { expect } = chai,
  expirationTime = '1h',
  payLoad = 'd4d6884c-ed49-4158-99cd-6305af05a4a6';

let token, verifiedToken;

describe('Test for creation of token', () => {
  it('should have a method to generate token', () => {
    expect(jwtUtil.generateToken).to.be.a('function');
  });

  it('should return generated token', () => {
    expect(expirationTime).to.be.a('string');
    expect(payLoad).to.be.a('string');

    token = jwtUtil.generateToken(expirationTime, payLoad);
    expect(token).to.be.a('string');
    expect(token).to.not.eq('null');
  });
});

describe('Test for verification of token', () => {
  it('should have a method to verify token', () => {
    expect(jwtUtil.verifyToken).to.be.a('function');
  });

  before(() => {
    token = jwtUtil.generateToken(expirationTime, payLoad);
    verifiedToken = jwtUtil.verifyToken(token);
  });
  it('should return payload used for token generation and token validity period', () => {
    expect(verifiedToken).to.be.an('object');
    expect(verifiedToken).to.have.property('payLoad');
    expect(verifiedToken).to.have.property('iat');
    expect(verifiedToken).to.have.property('exp');
    expect(verifiedToken.payLoad).to.equal(payLoad);
  });
});

describe('Test for error due to invalid token', () => {
  before(() => {
    token = jwtUtil.generateToken(expirationTime, payLoad);
  });
  it('should throw a JsonWebTokenError', () => {
    try {
      expect(jwtUtil.verifyToken(token.slice(2, 5))).to.throw(Error, 'JsonWebTokenError');
    } catch (err) {
      expect(err).to.be.a('object');
      expect(err.name).to.be.eql('JsonWebTokenError');
      expect(err.message).to.be.eql('jwt malformed');
    }
  });
});
