const chai = require('chai'),
  { expect } = chai;
const tokenValidator = require('../../middlewares/jwtValidator');

describe('Test make sure token validation middleware is working', () => {
  it('Should be a valid function', () => {
    expect(tokenValidator).to.be.a('function');
    expect(tokenValidator.length).to.be.eql(3);
  });
});
