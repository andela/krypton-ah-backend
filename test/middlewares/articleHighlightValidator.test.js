const { expect } = require('chai'),
  expressValidator = require('express-validator')(),
  sinon = require('sinon'),
  {
    nextMock, responseMock, requestMock, BAD_REQUEST_CODE
  } = require('../../constants'),
  articlesHighlightValidator = require('../../middlewares/articlesHighlightValidator');

describe('articlesHighlightValidator', async () => {
  afterEach(sinon.restore);
  let req;
  it('validates valid article highlight', async () => {
    requestMock.body.highlightedText = 'Valid highlighted text';
    requestMock.body.startIndex = 1;
    requestMock.body.endIndex = 2;
    await expressValidator(requestMock, {}, () => {
      req = requestMock;
    });
    const nextStub = sinon.stub(nextMock, 'next');
    await articlesHighlightValidator(req, responseMock, nextMock.next);
    expect(nextStub.calledOnce).to.equal(true);
  });
  it('call next if there is no highlightedText field', async () => {
    delete requestMock.body.highlightedText;
    requestMock.body.startIndex = 1;
    requestMock.body.endIndex = 2;
    await expressValidator(requestMock, {}, () => {
      req = requestMock;
    });
    const nextStub = sinon.stub(nextMock, 'next');
    await articlesHighlightValidator(req, responseMock, nextMock.next);
    expect(nextStub.calledOnce).to.equal(true);
  });
  it('does not validates invalid article highlight', async () => {
    requestMock.body.highlightedText = '';
    requestMock.startIndex = null;
    requestMock.endIndex = null;
    await expressValidator(requestMock, {}, () => {
      req = requestMock;
    });
    const nextStub = sinon.stub(nextMock, 'next');
    const jsonStub = sinon.stub(responseMock, 'json').returnsThis();
    const statusStub = sinon.stub(responseMock, 'status').returnsThis();
    await articlesHighlightValidator(req, responseMock, nextMock.next);
    expect(nextStub.calledOnce).to.equal(false);
    expect(statusStub.calledOnceWithExactly(BAD_REQUEST_CODE)).to.equal(true);
    expect(jsonStub.calledOnce).to.equal(true);
  });
});
