const chai = require('chai'),
  sinon = require('sinon'),
  sinonChai = require('sinon-chai'),
  { expect } = chai,
  partialJwtValidator = require('../../middlewares/partialJwtValidator'),
  jwtUtil = require('../../lib/utils/jwtUtil'),
  expirationTime = '1h',
  payLoad = 'd4d6884c-ed49-4158-99cd-6305af05a4a6',
  { nextMock, responseMock } = require('../../constants');

chai.use(sinonChai);
describe('Test make sure token validation middleware is working', () => {
  let token, requestMock;
  beforeEach(() => {
    requestMock = {
      body: {},
      query: {},
      headers: { authorization: '' },
      params: {}
    };
    token = jwtUtil.generateToken(expirationTime, payLoad);
  });
  afterEach(sinon.restore);
  it('Should call next function', () => {
    requestMock.body = { token };
    const nextStub = sinon.stub(nextMock, 'next');
    partialJwtValidator(requestMock, responseMock, nextMock.next);
    expect(nextStub.calledOnce).to.be.eq(true);
  });
  it('Should call next function', () => {
    requestMock.query = { token };
    const nextStub = sinon.stub(nextMock, 'next');
    partialJwtValidator(requestMock, responseMock, nextMock.next);
    expect(nextStub.calledOnce).to.be.eq(true);
  });
  it('Should call next function', () => {
    requestMock.params = { token };
    const nextStub = sinon.stub(nextMock, 'next');
    partialJwtValidator(requestMock, responseMock, nextMock.next);
    expect(nextStub.calledOnce).to.be.eq(true);
  });
  it('Should call next function', () => {
    requestMock.headers = { authorization: token };
    const nextStub = sinon.stub(nextMock, 'next');
    partialJwtValidator(requestMock, responseMock, nextMock.next);
    expect(nextStub.calledOnce).to.be.eq(true);
  });
  it('Should call next function when authorization is empty', () => {
    const nextStub = sinon.stub(nextMock, 'next');
    partialJwtValidator(requestMock, responseMock, nextMock.next);
    expect(nextStub.calledOnce).to.be.eq(true);
  });

  it('Should call next function when authorization is bad or expired', () => {
    const nextStub = sinon.stub(nextMock, 'next');
    requestMock.body = { token: 'a' };
    partialJwtValidator(requestMock, responseMock, nextMock.next);
    expect(nextStub.calledOnce).to.be.eq(true);
  });
});
