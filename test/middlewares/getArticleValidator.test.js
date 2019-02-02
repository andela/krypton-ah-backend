const { expect } = require('chai'),
  expressValidator = require('express-validator')(),
  sinon = require('sinon'),
  {
    requestMock, responseMock, nextMock, BAD_REQUEST_CODE
  } = require('../../constants'),
  getArticleValidator = require('../../middlewares/getArticleValidator'),
  { userdata } = require('../mockData');

describe('getArticleValidator middleware', async () => {
  let req;
  afterEach(sinon.restore);
  it('should validate valid article id and call next', async () => {
    requestMock.params = { id: userdata.id };
    await expressValidator(requestMock, {}, () => {
      req = requestMock;
    });
    const jsonStub = sinon.stub(responseMock, 'json').returnsThis();
    const statusStub = sinon.stub(responseMock, 'status').returnsThis();
    const nextStub = sinon.stub(nextMock, 'next');
    await getArticleValidator(req, responseMock, nextMock.next);
    expect(nextStub.called).to.equal(true);
    expect(jsonStub.calledOnce).to.equal(false);
    expect(statusStub.called).to.equal(false);
  });
  it('should not validate invalid article id', async () => {
    requestMock.params = { id: 'invalidId' };
    await expressValidator(requestMock, {}, () => {
      req = requestMock;
    });
    const jsonStub = sinon.stub(responseMock, 'json').returnsThis();
    const statusStub = sinon.stub(responseMock, 'status').returnsThis();
    const nextStub = sinon.stub(nextMock, 'next');
    await getArticleValidator(req, responseMock, nextMock.next);
    expect(nextStub.called).to.equal(false);
    expect(jsonStub.calledOnce).to.equal(true);
    expect(statusStub.calledOnceWithExactly(BAD_REQUEST_CODE)).to.equal(true);
  });
});
