const { expect } = require('chai'),
  sinon = require('sinon'),
  calculateReadTime = require('../../middlewares/calculateReadTime'),
  { requestMock, nextMock, responseMock } = require('../../constants'),
  { contents } = require('../mockData');

describe('calculateReadTime middleware', () => {
  after(sinon.restore);
  it('should calculate read time and call next', () => {
    const nextStub = sinon.stub(nextMock, 'next');
    requestMock.body.content = contents.words200;
    calculateReadTime(requestMock, responseMock, nextMock.next);
    expect(nextStub.called).to.equal(true);
    expect(requestMock.body.readtime).to.equal(1);
  });
});
